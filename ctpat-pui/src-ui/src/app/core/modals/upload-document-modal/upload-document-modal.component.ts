import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SaveDisMeta } from '../../models/save-dis-meta.model';
import { DisService } from '../../services/dis.service';

@Component({
  selector: 'app-upload-document-modal',
  templateUrl: './upload-document-modal.component.html',
  styleUrls: ['./upload-document-modal.component.scss']
})
export class UploadDocumentModalComponent implements OnInit, OnDestroy {

  public uploadDocumentForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  public isUploading = false;
  public documentFile!: File | null;
  public fileName = '';

  constructor(public dialogRef: MatDialogRef<UploadDocumentModalComponent>, private disService: DisService,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.submitted = false;

    this.uploadDocumentForm = this.formBuilder.group({
      selectedFile: new FormControl('', Validators.required),
      documentType: new FormControl('', Validators.required),
      documentLibrary: new FormControl((this.data && this.data.documentLibrary) ? this.data.documentLibrary : '1', Validators.required),
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.uploadDocumentForm.controls[controlName].hasError(errorName);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.uploadDocumentForm.controls;
  }

  save(): void {

    this.submitted = true;
    // UI validation before this point
    if (this.uploadDocumentForm.invalid) {
      return;
    }

    console.log('other validations then save id -> ' + this.data.id);

    this.uploadFile();
  }

  // refer to DIS. AES loads file and processes/saves data (no DIS-original document)
  uploadFile(): void {
    const formdata: FormData = new FormData();
    if (this.documentFile) {
      formdata.append('file', this.documentFile);
      const saveDisMeta: SaveDisMeta = new SaveDisMeta();
      saveDisMeta.docLblCd = 'CTPATDOC';

      formdata.set('saveDisMeta', JSON.stringify(saveDisMeta));

      this.disService.saveDisDoc(formdata).subscribe(response => {
        if (response != null && response !== '') {
        } else {
          // display error
        }

      }, (error: HttpErrorResponse) => {
        // display error
      });
    }

  }

  onFileSelected(event: any): void {
    this.isUploading = true;
    this.documentFile = event.target.files.item(0);

    const target = event.target as DataTransfer;
    if (this.documentFile != null) {
      this.fileName = this.documentFile.name;
    }

    this.processAttachmentData(target);
    this.isUploading = false;

    event.target.type = 'file';
    // reset file value so it can be selected again
    event.target.value = '';
  }

  processAttachmentData(target: any): void {
    const reader = new FileReader();

    // define reader event handler
    reader.onload = (e: any) => { // async
      const bstr: string = e.target.result; // file data as a binary string

      this.isUploading = false;
    };

    // genereate reader event
    reader.readAsBinaryString(target.files[0]);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

