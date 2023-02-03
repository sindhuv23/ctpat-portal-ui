import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-validation-with-visit-modal',
  templateUrl: './plan-validation-with-visit-modal.component.html',
  styleUrls: ['./plan-validation-with-visit-modal.component.scss']
})
export class PlanValidationWithVisitModalComponent implements OnInit, OnDestroy {

  public planValidationWithVisitForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<PlanValidationWithVisitModalComponent>, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.planValidationWithVisitForm = this.formBuilder.group({
        initiatedDate: new FormControl('', Validators.required),
        domesticVerificationDate: new FormControl(''),
        foreignVerificationDate: new FormControl(''),
        closeoutDate: new FormControl(''),
        canadianImporterIndicator: new FormControl('')
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.planValidationWithVisitForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.planValidationWithVisitForm.controls;
  }

  initiate(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.planValidationWithVisitForm.invalid){
      return;
    }
    console.log('initiate');
  }

  validateDate(controlName: string, dateInput: any): void {
    const hasDateInput = dateInput && dateInput.trim();
    const dateControl = this.planValidationWithVisitForm.get(controlName);

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
