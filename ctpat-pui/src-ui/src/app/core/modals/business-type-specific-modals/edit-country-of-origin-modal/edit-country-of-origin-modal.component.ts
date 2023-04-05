import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-country-of-origin-modal',
  templateUrl: './edit-country-of-origin-modal.component.html',
  styleUrls: ['./edit-country-of-origin-modal.component.scss']
})
export class EditCountryOfOriginModalComponent implements OnInit, OnDestroy {

  public editCooForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<EditCountryOfOriginModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    // country data should be populated from database with account ID
    this.editCooForm = this.formBuilder.group({
      percentageImports: new FormControl(100),
      suggestedIndicator: new FormControl(true),
      countryOfOrigin: new FormControl({value: 'CA', disabled: true}),
      stateOfOrigin: new FormControl({value: 'stateId', disabled: true}),
      cityOfOrigin: new FormControl({value: '', disabled: true}),
    });

  }

  countrySelected(event: any): void {
    if (event){
      this.editCooForm.get('stateOfOrigin')?.enable();
    } else {
      this.editCooForm.get('stateOfOrigin')?.disable();
      this.editCooForm.get('stateOfOrigin')?.setValue(null);
      this.editCooForm.get('cityOfOrigin')?.disable();
      this.editCooForm.get('cityOfOrigin')?.setValue(null);
    }
  }

  stateSelected(event: any): void {
    if (event){
      this.editCooForm.get('cityOfOrigin')?.enable();
    } else {
      this.editCooForm.get('cityOfOrigin')?.disable();
      this.editCooForm.get('cityOfOrigin')?.setValue(null);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editCooForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editCooForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.editCooForm.invalid){
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
