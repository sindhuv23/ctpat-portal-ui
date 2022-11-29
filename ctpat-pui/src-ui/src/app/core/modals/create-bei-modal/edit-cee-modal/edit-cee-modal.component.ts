import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-cee-modal',
  templateUrl: './edit-cee-modal.component.html',
  styleUrls: ['./edit-cee-modal.component.scss']
})
export class EditCeeModalComponent implements OnInit, OnDestroy {

  public editCeeForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<EditCeeModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.editCeeForm = this.formBuilder.group({
      approvedIndicator: new FormControl('Y'),
      cee: new FormControl('CEE001', Validators.required),
      // checkboxes
      agricultureIndicator: new FormControl(false),
      apparelIndicator: new FormControl(false),
      automotiveIndicator: new FormControl(false),
      metalIndicator: new FormControl(false),
      consumerProductIndicator: new FormControl(false),
      electronicsIndicator: new FormControl(false),
      materialsIndicator: new FormControl(false),
      machineryIndicator: new FormControl(false),
      petroleumIndicator: new FormControl(false),
      chemicalsIndicator: new FormControl(false)
    });

    this.populateFields();
  }

  populateFields(): void{
    // populate form field based on ID passed in - this.data.id.
  }

  isAnyCommoditySelected(): boolean {
    const formRawValue = this.editCeeForm.getRawValue();
    return formRawValue.agricultureIndicator
        || formRawValue.apparelIndicator
        || formRawValue.automotiveIndicator
        || formRawValue.metalIndicator
        || formRawValue.consumerProductIndicator
        || formRawValue.electronicsIndicator
        || formRawValue.materialsIndicator
        || formRawValue.machineryIndicator
        || formRawValue.petroleumIndicator
        || formRawValue.chemicalsIndicator;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editCeeForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editCeeForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.editCeeForm.invalid || !this.isAnyCommoditySelected()){
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
