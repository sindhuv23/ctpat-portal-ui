import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-previous-visit-records-modal',
  templateUrl: './add-previous-visit-records-modal.component.html',
  styleUrls: ['./add-previous-visit-records-modal.component.scss']
})
export class AddPreviousVisitRecordsModalComponent implements OnInit, OnDestroy {

  public addPreviousVisitRecordsForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<AddPreviousVisitRecordsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.addPreviousVisitRecordsForm = this.formBuilder.group({
      // beiType: new FormControl('', Validators.required),
      // beiValue: new FormControl('', Validators.required)
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addPreviousVisitRecordsForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addPreviousVisitRecordsForm.controls;
  }

  associate(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.addPreviousVisitRecordsForm.invalid){
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

