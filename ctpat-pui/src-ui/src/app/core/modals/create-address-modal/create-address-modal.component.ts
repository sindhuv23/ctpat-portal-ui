import { AccountService } from 'src/app/core/services/account.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-create-address-modal',
  templateUrl: './create-address-modal.component.html',
  styleUrls: ['./create-address-modal.component.scss']
})
export class CreateAddressModalComponent implements OnInit {

  public submitted = false;
  public createAccountAddressForm!: FormGroup;
  public addressTypeList$!: Observable<any>;
  public countryList$!: Observable<any>;
  public stateList!: Array<any>;
  public stateDisplayList: Array<any> = [];

  constructor(public dialogRef: MatDialogRef<CreateAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    const address  = this.data.address;
    this.submitted = false;
    this.createAccountAddressForm = this.formBuilder.group({
      id: new FormControl(address?.id),
      ctpatAccountId: new FormControl(address?.ctpatAccountId),
      typeNameId: new FormControl(address?.typeNameId, Validators.required),
      street1: new FormControl(address?.street1, Validators.required),
      street2: new FormControl(address?.street2),
      city: new FormControl(address?.city, Validators.required),
      postalCode: new FormControl(address?.postalCode, Validators.required),
      countryId: new FormControl(address?.countryId, Validators.required),
      stateId: new FormControl(address?.stateId),
      isPrimaryAddress: new FormControl(address?.isPrimaryAddress === 'Y' ? true: false),
      isMailingAddress: new FormControl(address?.isMailingAddress === 'Y' ? true: false)
    });
    this.addressTypeList$ = this.accountService.getRefData('getAddressTypeList');
    this.countryList$ = this.accountService.getAccountData('getCountryList'); 
    this.accountService.getAccountData('getStateList').subscribe(states=> {
        this.stateList = states;
        if(address?.countryId){
            this.populateStates(address?.countryId);
        }
    });
  }

  get f(): {[key: string]: AbstractControl} {
    return this.createAccountAddressForm.controls;
  }

  populateStates(countryId: any): void {
    this.stateDisplayList = this.stateList.filter(state => state.countryId == countryId);
  }

  save(): void {
    this.submitted = true;
    const address = this.createAccountAddressForm.getRawValue();
    address.isMailingAddress = address.isMailingAddress ? 'Y' : 'N';
    address.isPrimaryAddress = address.isPrimaryAddress ? 'Y' : 'N';
    if (this.createAccountAddressForm.invalid) {
      return;
    }
    this.accountService.saveAccountAddress(address).subscribe(res => {
        console.log('Ctpat Account Address saved, response => '+ res);
        this.dialogRef.close(res.ctpatAccountId);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}