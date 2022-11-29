import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddNewBeiModalComponent } from '../add-new-bei-modal/add-new-bei-modal.component';

@Component({
  selector: 'app-edit-bei-modal',
  templateUrl: './edit-bei-modal.component.html',
  styleUrls: ['./edit-bei-modal.component.scss']
})
export class EditBeiModalComponent implements OnInit, OnDestroy {

  public editBeiForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<AddNewBeiModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.editBeiForm = this.formBuilder.group({
      vettedApprovedIndicator: new FormControl({value: 'Yes', disabled: true}),
      beiType: new FormControl({value: 'IOR', disabled: true}),
      beiValue: new FormControl('', Validators.required),
      beiBenefit: new FormControl('NONE', Validators.required),
      tradeComplianceIndicator: new FormControl('Y')
    });

    this.populateFields();
  }

  populateFields(): void{
    // populate form field based on ID passed in - this.data.id.
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editBeiForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editBeiForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.editBeiForm.invalid){
      return;
    }

    console.log('other validations then save id -> ' + this.data.id);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
