import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from '../../confirmation-dialog-modal/confirmation-dialog-modal.component';
import { EditSiteInfoModalComponent } from '../edit-site-info-modal/edit-site-info-modal.component';

@Component({
  selector: 'app-edit-site-list-modal',
  templateUrl: './edit-site-list-modal.component.html',
  styleUrls: ['./edit-site-list-modal.component.scss']
})
export class EditSiteListModalComponent implements OnInit, OnDestroy {

  public editSiteListForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  displayedColumnsNewSite: string[] = ['noGoZoneIndicator', 'noGoReason', 'otherReason', 'gpsCoordinates', 'address', 'entryId'];
  private dataNewSite: any[] = [];
  public dataSourceNewSite = new MatTableDataSource<any>();

  constructor(public dialogRef: MatDialogRef<EditSiteListModalComponent>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public dataPassedIn: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.editSiteListForm = this.formBuilder.group({
      noGoZoneIndicator: new FormControl(false),
      noGoReason: new FormControl(''),
      otherReason: new FormControl(''),
      gpsCoordinates: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl({value: '', disabled: true}),
      city: new FormControl(''),
      street: new FormControl(''),
      postalCode: new FormControl('')
    });

    this.dataNewSite = this.dataPassedIn;
    this.dataSourceNewSite = new MatTableDataSource<any>(this.dataNewSite);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editSiteListForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editSiteListForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.editSiteListForm.invalid){
      return;
    }

    console.log('other validations then save');
  }

  addNewSite(): void{
    const formRawValue = this.editSiteListForm.getRawValue();
    if (formRawValue.state && formRawValue.country){
      this.dataNewSite.push({noGoZoneIndicator: formRawValue.noGoZoneIndicator, noGoReason: formRawValue.noGoReason,
        otherReason: formRawValue.otherReason, gpsCoordinates: formRawValue.gpsCoordinates, address: {
          state: formRawValue.state, city: formRawValue.city, country: formRawValue.country,
          street: formRawValue.street, postalCode: formRawValue.postalCode,
        }, entryId: this.dataNewSite.length});
      this.dataSourceNewSite = new MatTableDataSource<any>(this.dataNewSite);

      this.editSiteListForm.reset();
    }
  }

  confirmDeletion(id: any): void{
    const confirmRef = this.dialog.open(ConfirmationDialogModalComponent, {
      disableClose: true,
      width: '460px',
      height: '200px',
      data: {
        title: 'Please Confirm Delete Action',
        message: 'This record will be deleted and cannot be recovered. \nContinue to delete?'
      }
    });
    confirmRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteNewSiteEntry(id);
      }
    });
  }

  deleteNewSiteEntry(id: any): void{
    this.dataNewSite.splice(id, 1);
    for (let i = 0; i < this.dataNewSite.length; i++) {
     this.dataNewSite[i].entryId = i;
    }
    this.dataSourceNewSite = new MatTableDataSource<any>(this.dataNewSite);
  }

  editSiteInfo(id: any): void{
    const dialogRef = this.dialog.open(EditSiteInfoModalComponent, {
      data: this.dataNewSite[id],
      width: '900px',
      height: '428px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataNewSite[id] = result;
        this.dataSourceNewSite = new MatTableDataSource<any>(this.dataNewSite);
      }
    });
  }

  countrySelected(event: any): void {
    if (event){
      this.editSiteListForm.get('state')?.enable();
    } else {
      this.editSiteListForm.get('state')?.disable();
      this.editSiteListForm.get('state')?.setValue(null);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}



