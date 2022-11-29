import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-country-of-origin-modal',
  templateUrl: './add-country-of-origin-modal.component.html',
  styleUrls: ['./add-country-of-origin-modal.component.scss']
})
export class AddCountryOfOriginModalComponent implements OnInit, OnDestroy {

  public addCooForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<AddCountryOfOriginModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.addCooForm = this.formBuilder.group({
      percentageImports: new FormControl(''),
      suggestedIndicator: new FormControl(true),
      countryOfOrigin: new FormControl(''),
      stateOfOrigin: new FormControl({value: '', disabled: true}),
      cityOfOrigin: new FormControl({value: '', disabled: true}),
    });

  }

  countrySelected(event: any): void {
    if (event){
      this.addCooForm.get('stateOfOrigin')?.enable();
    } else {
      this.addCooForm.get('stateOfOrigin')?.disable();
      this.addCooForm.get('stateOfOrigin')?.setValue(null);
      this.addCooForm.get('cityOfOrigin')?.disable();
      this.addCooForm.get('cityOfOrigin')?.setValue(null);
    }
  }

  stateSelected(event: any): void {
    if (event){
      this.addCooForm.get('cityOfOrigin')?.enable();
    } else {
      this.addCooForm.get('cityOfOrigin')?.disable();
      this.addCooForm.get('cityOfOrigin')?.setValue(null);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addCooForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addCooForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.addCooForm.invalid){
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
