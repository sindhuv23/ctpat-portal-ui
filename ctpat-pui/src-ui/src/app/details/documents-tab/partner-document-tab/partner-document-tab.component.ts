import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UploadDocumentModalComponent } from 'src/app/core/modals/upload-document-modal/upload-document-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { ConfirmationFileUploadDialogModalComponent } from 'src/app/core/modals/confirmation-file-upload-dialog-modal/confirmation-file-upload-dialog-modal.component';

@Component({
  selector: 'app-partner-document-tab',
  templateUrl: './partner-document-tab.component.html',
  styleUrls: ['./partner-document-tab.component.scss']
})
export class PartnerDocumentTabComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();
  public companyId = 'doc222';

  displayedColumns: string[] = ['fileName', 'type', 'fileSize', 'uploadedBy', 'uploadedDateTime', 'entryId'];
  private dataDocuments: any[] = [];
  public dataSourceDocuments = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  public documentForm!: FormGroup;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.documentForm = this.formBuilder.group({
      documentCat: new FormControl(''),
      textInput: new FormControl('')
    });

    this.documentForm.valueChanges.subscribe(() => {
      this.doFilter();
    });
  }

  ngOnInit(): void {
  }

  doFilter(): void {
    const rawValues = this.documentForm.getRawValue();
    const filterString = JSON.stringify({
      documentCat: rawValues.documentCat.trim().toLowerCase(),
      textInput: rawValues.textInput.trim().toLowerCase()
    });
    this.dataSourceDocuments.filter = filterString;
  }

  // documentCat can be derived by backend or filtered by type on frontend
  // upload datetime will be date object and sorted by datetime
  ngAfterViewInit(): void {
    this.dataDocuments.push({
      fileName: 'someFile.pdf', type: 'TC Type1', fileSize: '116.35kb', uploadedBy: 'John Doe',
      uploadedDateTime: new Date('06-02-2022 15:33'), documentCat: 'T', entryId: 0
    });
    this.dataDocuments.push({
      fileName: 'someFile2.doc', type: 'ACCT Type', fileSize: '222.3kb', uploadedBy: 'Sam Partner',
      uploadedDateTime: new Date('05-22-2021 08:21'), documentCat: 'A', entryId: 1
    });
    this.dataDocuments.push({
      fileName: 'someFile3.jpg', type: 'TC Type2', fileSize: '455.25kb', uploadedBy: 'Someone',
      uploadedDateTime: new Date('01-12-2022 09:21'), documentCat: 'T', entryId: 2
    });
    this.dataSourceDocuments = new MatTableDataSource<any>(this.dataDocuments);
    this.dataSourceDocuments.paginator = this.paginator;
    this.dataSourceDocuments.sort = this.matSort;
    this.addFilterPredicate();
  }

  addFilterPredicate(): void {
    this.dataSourceDocuments.filterPredicate = (dataRecord: any, filterString: any): boolean => {
      const filterObject = JSON.parse(filterString);
      const a = !filterObject.documentCat || dataRecord.documentCat.toLowerCase() === filterObject.documentCat;
      const b = !filterObject.textInput ||
        dataRecord.fileName.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.type.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.fileSize.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.uploadedBy.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.uploadedDateTime.toString().toLowerCase().includes(filterObject.textInput);
      return a && b;
    };
  }

  confirmUploadDocument(id: any): void {
    const confirmDdialogRef = this.dialog.open(ConfirmationFileUploadDialogModalComponent, {
      data: {},
      width: '450px',
      height: '180px',
      disableClose: true
    });

    confirmDdialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.uploadDocument(id);
      }
    });
  }
  // open upload modal. if new doc saved, publish form the modal and update this display section from backend.
  uploadDocument(id: any): void {
    const dialogRef = this.dialog.open(UploadDocumentModalComponent, {
      data: { id, documentLibrary: '1' },
      width: '600px',
      height: '302px',
      disableClose: true
    });
  }

  confirmDeletion(id: any): void {
    const confirmRef = this.dialog.open(ConfirmationDialogModalComponent, {
      disableClose: true,
      width: '460px',
      data: {
        title: 'Please Confirm Delete Action',
        message: 'This record will be deleted and cannot be recovered. \nContinue to delete?'
      }
    });
    confirmRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDocumentRecordEntry(id);
      }
    });
  }

  // to be deleted when backend is connected. retrieval of updated data deletes the record.
  deleteDocumentRecordEntry(id: any): void {
    this.dataDocuments.splice(id, 1);
    for (let i = 0; i < this.dataDocuments.length; i++) {
      this.dataDocuments[i].entryId = i;
    }
    this.dataSourceDocuments = new MatTableDataSource<any>(this.dataDocuments);
    this.dataSourceDocuments.paginator = this.paginator;
    this.dataSourceDocuments.sort = this.matSort;
    this.addFilterPredicate();
    this.doFilter();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
