import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<PlanValidationWithNoVisitModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.planValidationWithNoVisitForm = this.formBuilder.group({
      // beiType: new FormControl('', Validators.required),
      // beiValue: new FormControl('', Validators.required)
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

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


