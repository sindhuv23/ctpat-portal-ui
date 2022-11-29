import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-visit-modal',
  templateUrl: './add-new-visit-modal.component.html',
  styleUrls: ['./add-new-visit-modal.component.scss']
})
export class AddNewVisitModalComponent implements OnInit, OnDestroy {

  public addNewVisitForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<AddNewVisitModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.addNewVisitForm = this.formBuilder.group({
      // beiType: new FormControl('', Validators.required),
      // beiValue: new FormControl('', Validators.required)
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

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

