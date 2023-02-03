import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-submit-to-supervisor-modal',
  templateUrl: './submit-to-supervisor-modal.component.html',
  styleUrls: ['./submit-to-supervisor-modal.component.scss']
})
export class SubmitToSupervisorModalComponent implements OnInit, OnDestroy {

  public submitToSupervisorForm!: FormGroup;
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<SubmitToSupervisorModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.submitToSupervisorForm = this.formBuilder.group({
      status: new FormControl('', Validators.required)
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.submitToSupervisorForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.submitToSupervisorForm.controls;
  }

  submit(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.submitToSupervisorForm.invalid){
      return;
    }

    console.log('other validations if any, then submit');

    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
  }
}
