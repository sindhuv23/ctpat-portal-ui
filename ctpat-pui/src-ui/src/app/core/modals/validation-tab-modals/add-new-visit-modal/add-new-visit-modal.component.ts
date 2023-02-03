import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-visit-modal',
  templateUrl: './add-new-visit-modal.component.html',
  styleUrls: ['./add-new-visit-modal.component.scss']
})
export class AddNewVisitModalComponent implements OnInit, OnDestroy {

  public addNewVisitForm!: FormGroup;
  public consultantForm!: FormGroup;
  public attendeeForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  displayedColumnsConsultantRecords: string[] = ['name', 'type', 'entryId'];
  private dataConsultantRecords: any[] = [];
  public dataSourceConsultantRecords = new MatTableDataSource<any>();

  displayedColumnsAttendeeRecords: string[] = ['name', 'title', 'company', 'entryId'];
  private dataAttendeeRecords: any[] = [];
  public dataSourceAttendeeRecords = new MatTableDataSource<any>();

  constructor(public dialogRef: MatDialogRef<AddNewVisitModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.addNewVisitForm = this.formBuilder.group({
      visitStartDate: new FormControl('', Validators.required),
      visitEndDate: new FormControl('', Validators.required),
      visitName: new FormControl('', Validators.required),
      leadScss: new FormControl('', Validators.required),
      additionalScss: new FormControl(''),
      companyName: new FormControl('', Validators.required),
      website: new FormControl(''),
      street1: new FormControl('', Validators.required),
      street2: new FormControl(''),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl(''),
      country: new FormControl('', Validators.required),
      state: new FormControl('')
    });

    this.consultantForm = this.formBuilder.group({
      name: new FormControl(''),
      type: new FormControl('')
    });

    this.attendeeForm = this.formBuilder.group({
      name: new FormControl(''),
      title: new FormControl(''),
      company: new FormControl('')
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addNewVisitForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addNewVisitForm.controls;
  }

  add(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.addNewVisitForm.invalid){
      return;
    }

    console.log('other validations then save');
  }

  validateDate(controlName: string, dateInput: any): void {
    const hasDateInput = dateInput && dateInput.trim();
    const dateControl = this.addNewVisitForm.get(controlName);

    if (dateControl){
      if (hasDateInput) {
        // check date format error for manual inputs
        dateControl.setValidators([Validators.required]);
      } else {
        dateControl.clearValidators();
      }
      dateControl.updateValueAndValidity();
    }
  }

  toFullDate(autoCompleteInput: string, dateInput: string): any {
    if (!autoCompleteInput && !dateInput) {
      return null;
    } else if (!autoCompleteInput) {
      return dateInput;
    }

    const date = new Date(autoCompleteInput);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  addNewConsultantRecord(): void{
    const formRawValue = this.consultantForm.getRawValue();
    if (formRawValue.name && formRawValue.type){
      this.dataConsultantRecords.push({name: formRawValue.name, type: formRawValue.type, entryId: this.dataConsultantRecords.length});
      this.dataSourceConsultantRecords = new MatTableDataSource<any>(this.dataConsultantRecords);

      this.consultantForm.reset();
    }
  }

  deleteConsultantRecordEntry(id: any): void{
    this.dataConsultantRecords.splice(id, 1);
    for (let i = 0; i < this.dataConsultantRecords.length; i++) {
     this.dataConsultantRecords[i].entryId = i;
    }
    this.dataSourceConsultantRecords = new MatTableDataSource<any>(this.dataConsultantRecords);
  }

  addNewAttendeeRecord(): void{
    const formRawValue = this.attendeeForm.getRawValue();
    if (formRawValue.name && formRawValue.title && formRawValue.company){
      this.dataAttendeeRecords.push({name: formRawValue.name, title: formRawValue.title,
        company: formRawValue.company, entryId: this.dataAttendeeRecords.length});
      this.dataSourceAttendeeRecords = new MatTableDataSource<any>(this.dataAttendeeRecords);

      this.attendeeForm.reset();
    }
  }

  deleteAttendeeRecordEntry(id: any): void{
    this.dataAttendeeRecords.splice(id, 1);
    for (let i = 0; i < this.dataAttendeeRecords.length; i++) {
     this.dataAttendeeRecords[i].entryId = i;
    }
    this.dataSourceAttendeeRecords = new MatTableDataSource<any>(this.dataAttendeeRecords);
  }

  countrySelected(event: any): void {
    if (event){
      this.addNewVisitForm.get('state')?.enable();
    } else {
      this.addNewVisitForm.get('state')?.disable();
      this.addNewVisitForm.get('state')?.setValue(null);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

