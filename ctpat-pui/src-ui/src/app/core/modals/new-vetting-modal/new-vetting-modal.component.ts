import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-vetting-modal',
  templateUrl: './new-vetting-modal.component.html',
  styleUrls: ['./new-vetting-modal.component.scss']
})
export class NewVettingModalComponent implements OnInit,  OnDestroy {

  public newVettingForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  public businessType!: string;

  displayedColumns: string[] = [];
  public dataSourceQuestions = new MatTableDataSource<any>();

  constructor(public dialogRef: MatDialogRef<NewVettingModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;
    this.businessType = this.data.businessType;
    this.newVettingForm = this.formBuilder.group({
      // companyName: new FormControl('')
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.newVettingForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.newVettingForm.controls;
  }

  saveDraft(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.newVettingForm.invalid){
      return;
    }

    console.log('other validations then save draft');
  }

  submit(): void {
    this.submitted = true;
    // UI validation before this point
    if (this.newVettingForm.invalid){
      return;
    }

    console.log('other validations then submit');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  clear(): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

