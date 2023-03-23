import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BeiAccountCrudService } from 'src/app/core/services/bei-account-crud.service';
import { RefreshService } from 'src/app/core/services/refresh.service';
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
  public showDropDown = false; 

  constructor(public dialogRef: MatDialogRef<AddNewBeiModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,  
              private beiCrudService: BeiAccountCrudService,
              private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.submitted = false;
//this.data.beiObject is the bei 
    this.editBeiForm = this.formBuilder.group({
      vettedApprovedIndicator: new FormControl({value: 'Yes', disabled: true}),
      beiType: new FormControl({value: 'IOR', disabled: true}),
      beiValue: [this.data.beiObject.beiValue || '', Validators.required],//new FormControl({value : this.data.beiValue || '', Validators.required}),
      beiBenefit: new FormControl('NONE', Validators.required),
      tradeComplianceIndicator: new FormControl('Y')
    });

    this.populateFields();
  }

  populateFields(): void{
    //console.log(this.data);
    this.editBeiForm.controls["beiValue"].setValue(this.data.beiObject.beiValue);
    this.editBeiForm.controls["vettedApprovedIndicator"].setValue(this.data.beiObject.vettedApproved);
    this.showDropDown = this.data.beiObject.tcActiveInd==="Y";
    console.log(this.data);
    console.log("DROPDOWN " + this.showDropDown + " OO " + this.data.tcActiveInd);
    //console.log(this.editBeiForm.controls["beiValue"]);
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
    console.log(this.editBeiForm.getRawValue());
    this.data.beiObject.beiValue = this.editBeiForm.getRawValue().beiValue;
    this.data.beiObject.tcActiveInd = this.editBeiForm.getRawValue().tradeComplianceIndicator;
    this.data.beiObject.benefitTxt = this.editBeiForm.getRawValue().beiBenefit;
    this.subscriptions.add(
      this.beiCrudService.update(this.data.beiObject).subscribe(response => {
       
      })     
      );
      this.refreshService.refresh();
      this.dialogRef.close();
      

  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
