import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-approve-reject-validation-report-modal',
  templateUrl: './approve-reject-validation-report-modal.component.html',
  styleUrls: ['./approve-reject-validation-report-modal.component.scss']
})
export class ApproveRejectValidationReportModalComponent implements OnInit, OnDestroy {

  public approveRejectValidationReportForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<ApproveRejectValidationReportModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.approveRejectValidationReportForm = this.formBuilder.group({
      // beiType: new FormControl('', Validators.required),
      // beiValue: new FormControl('', Validators.required)
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.approveRejectValidationReportForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.approveRejectValidationReportForm.controls;
  }

  approve(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.approveRejectValidationReportForm.invalid){
      return;
    }

    console.log('other validations then save');
  }

  reject(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.approveRejectValidationReportForm.invalid){
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


