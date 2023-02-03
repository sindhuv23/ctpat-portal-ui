import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plan-validation-with-no-visit-modal',
  templateUrl: './plan-validation-with-no-visit-modal.component.html',
  styleUrls: ['./plan-validation-with-no-visit-modal.component.scss']
})
export class PlanValidationWithNoVisitModalComponent implements OnInit, OnDestroy {

  public planValidationWithNoVisitForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  displayedColumnsNewSite: string[] = ['noGoZoneIndicator', 'noGoReason', 'otherReason', 'gpsCoordinates', 'address', 'entryId'];
  private dataNewSite: any[] = [];
  public dataSourceNewSite = new MatTableDataSource<any>();

  constructor(public dialogRef: MatDialogRef<PlanValidationWithNoVisitModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.planValidationWithNoVisitForm = this.formBuilder.group({
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
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.planValidationWithNoVisitForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.planValidationWithNoVisitForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.planValidationWithNoVisitForm.invalid){
      return;
    }

    console.log('other validations then save');
  }

  addNewSite(): void{
    const formRawValue = this.planValidationWithNoVisitForm.getRawValue();
    if (formRawValue.state && formRawValue.country){
      this.dataNewSite.push({noGoZoneIndicator: formRawValue.noGoZoneIndicator, noGoReason: formRawValue.noGoReason,
        otherReason: formRawValue.otherReason, gpsCoordinates: formRawValue.gpsCoordinates, address: {
          state: formRawValue.state, city: formRawValue.city, country: formRawValue.country,
          street: formRawValue.street, postalCode: formRawValue.postalCode,
        }, entryId: this.dataNewSite.length});
      this.dataSourceNewSite = new MatTableDataSource<any>(this.dataNewSite);

      this.planValidationWithNoVisitForm.reset();
    }
  }

  deleteNewSiteEntry(id: any): void{
    this.dataNewSite.splice(id, 1);
    for (let i = 0; i < this.dataNewSite.length; i++) {
     this.dataNewSite[i].entryId = i;
    }
    this.dataSourceNewSite = new MatTableDataSource<any>(this.dataNewSite);
  }

  countrySelected(event: any): void {
    if (event){
      this.planValidationWithNoVisitForm.get('state')?.enable();
    } else {
      this.planValidationWithNoVisitForm.get('state')?.disable();
      this.planValidationWithNoVisitForm.get('state')?.setValue(null);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


