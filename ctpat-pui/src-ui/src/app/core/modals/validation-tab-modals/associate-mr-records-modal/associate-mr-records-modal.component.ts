import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-associate-mr-records-modal',
  templateUrl: './associate-mr-records-modal.component.html',
  styleUrls: ['./associate-mr-records-modal.component.scss']
})
export class AssociateMrRecordsModalComponent implements OnInit, OnDestroy {

  public associateMrRecordsForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<AssociateMrRecordsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.associateMrRecordsForm = this.formBuilder.group({
      // beiType: new FormControl('', Validators.required),
      // beiValue: new FormControl('', Validators.required)
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.associateMrRecordsForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.associateMrRecordsForm.controls;
  }

  associate(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.associateMrRecordsForm.invalid){
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


