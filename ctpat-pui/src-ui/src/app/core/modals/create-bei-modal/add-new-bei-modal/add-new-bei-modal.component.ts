import { Component, Inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AccountBei } from 'src/app/core/models/AccountBei';
import { AccountService } from 'src/app/core/services/account.service';
import { BeiAccountCrudService } from 'src/app/core/services/bei-account-crud.service';
import { CtpatUserService } from 'src/app/core/services/ctpat-user.service';
import { RefreshService } from 'src/app/core/services/refresh.service';

@Component({
  selector: 'app-add-new-bei-modal',
  templateUrl: './add-new-bei-modal.component.html',
  styleUrls: ['./add-new-bei-modal.component.scss']
})


export class AddNewBeiModalComponent implements OnInit, OnDestroy {

  public addNewBeiForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  //eligibilitycatalog list
  public ecList$!: Observable<any>;
  private ctpatAccountId: any; //for current ctpataccountid
  private businessTypeId: any; //for current ctpataccountid
  public selectedOption!: any;
  public errorMessage!: string;
  public showError = true;
  public inputPlaceholder!: string;
  public inputValue!: any;

  constructor(public dialogRef: MatDialogRef<AddNewBeiModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, 
              private accountService: AccountService, private beiCrudService: BeiAccountCrudService,
              private refreshService: RefreshService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.submitted = false;
    const record = this.data.row;
    this.inputValue = record?.beiValue;
    this.addNewBeiForm = this.formBuilder.group({
      beiType: new FormControl(record?.beiType, Validators.required),
      beiValue: new FormControl(record?.beiValue, Validators.required),
      vettedApproved: new FormControl(record?.vettedApproved === 'Y'),
      duplicateAccountName: new FormControl(record?.duplicateAccountName),
      duplicateAccountNumber: new FormControl(record?.duplicateAccountNumber)
    });
   
   //get hold of accounid
    this.subscriptions.add(
    this.accountService.accountId$.subscribe(id => this.ctpatAccountId = id)
   );
   //get hold of businesstypeid
   this.subscriptions.add(
    this.accountService.businessTypeId$.subscribe(id => this.businessTypeId = id)
   );
  
   this.ecList$ = this.accountService.getRfEligibilityByBusinessId(this.businessTypeId);
   console.log(this.ecList$);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addNewBeiForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addNewBeiForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.addNewBeiForm.invalid){
      return;
    }
    console.log('Before validating input:');

    this.validateInput();

    console.log('After validating input: showError value :'+ this.showError);

    if(this.showError) {
      
      return;
    }

    const accountBei = new AccountBei();
    accountBei.beiValue = this.addNewBeiForm.getRawValue().beiValue;
    accountBei.ctpatAccount = this.ctpatAccountId;
    accountBei.eligibilityCatalogId = this.addNewBeiForm.getRawValue().beiType.id;
    accountBei.eligibilityCatalogVersionNo = 1;
    accountBei.securityModelAccountId = this.ctpatAccountId;
    accountBei.tcActiveInd = "N";
    accountBei.activeCode = "A";
    accountBei.vettedApproved = "Y";
    accountBei.benefitTxt = "Validated";

    this.subscriptions.add(
      this.beiCrudService.create(accountBei).subscribe(beiResponse=>console.log(beiResponse))

    );
    
    this.refreshService.refresh();
    this.dialogRef.close();
    
    //{beiType: 'BOND', beiValue: 'ooo'}
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  validateInput(): void {
    console.log('validate input:' + this.selectedOption.beiType);
    this.showError = false;
    let pattern! : RegExp;
    if(this.selectedOption.beiType === 'BOND' || this.selectedOption.beiType === 'CBP BOND') {
      
      pattern = /^[a-zA-Z0-9]{9}$/;
      
  } else if(this.selectedOption.beiType === 'SCAC') {
    pattern = /^[a-zA-Z]{4}$/;
  
  }  else if(this.selectedOption.beiType === 'FMC') {
     pattern = /^[a-zA-Z0-9]{6}$/;
   
  }  else if(this.selectedOption.beiType === 'DOT'){
     pattern = /^[a-zA-Z0-9]{5,8}$/;
   
  }  else if(this.selectedOption.beiType === 'IATA'){
     pattern = /^[a-zA-Z0-9]{1,15}$/;
   
  } else if(this.selectedOption.beiType === 'MID'){
    if(this.inputValue.length() > 15) {
      this.showError = true;
    }
    pattern = /^[A-Za-z]{2}[A-Za-z0-9]{0,13}$/;


    //TODO:Retrieve country codes and check if the first two digits match any of the country code. 

  } else if(this.selectedOption.beiType === 'IOR'){
     pattern = /^([0-9]{3}-[0-9]{2}-[0-9]{4}|[0-9]{2}-[0-9]{5}[A-Za-z0-9]{2}|[0-9]{6}-[0-9]{5})$/;
   
  } else if(this.selectedOption.beiType === 'Broker License Number'){
     pattern = /^\d{4,5}$/;
   
  } else if(this.selectedOption.beiType === 'EIN'){
     pattern = /^\d{2}-\d{7}$/;
   
  } else if(this.selectedOption.beiType === 'DUNS'){
     pattern = /^([0-9]{9}|[0-9]{2}-[0-9]{3}-[0-9]{4})/;
    
  } else if(this.selectedOption.beiType === 'Filer Code'){
     pattern = /^[a-zA-Z0-9]{3}$/;
   
  } else if(this.selectedOption.beiType === 'SCT Number'){
     pattern = /^([a-zA-Z0-9]{5,8}|[a-zA-Z0-9]{12,13})$/;
   
  } else if(this.selectedOption.beiType === 'ACE FAST ID' || this.selectedOption.beiType === 'TSA'){
    if(this.inputValue === "") {
      this.showError = true;
    }
  } else {
    pattern =/^/;
  }
  console.log('input value:' + this.inputValue);
  console.log('test patteren:' + pattern);
  
  if(!pattern.test(this.inputValue)) {
    console.log('inside pattern check :');
    this.showError = true;
  //  this.changeDetectorRef.detectChanges();
  }
  }

  updateInputPlaceholder(): void {
    if(this.selectedOption.beiType === 'BOND' || this.selectedOption.beiType === 'CBP BOND') {
        this.inputPlaceholder = "Nine alphanumeric characters";
        this.errorMessage = 'Bond Number must be a nine character alphanumeric code';
        this.changeDetectorRef.detectChanges();
    } else if(this.selectedOption.beiType === 'SCAC') {
        this.inputPlaceholder = 'Four Alphabetical Code';
        this.errorMessage = 'SCAC must be a four character alphabetical code';
        this.changeDetectorRef.detectChanges();
    }  else if(this.selectedOption.beiType === 'FMC') {
      this.inputPlaceholder = 'Six alphanumeric characters';
      this.errorMessage = 'FMC ORG Number must be a six digit alphanumeric code';
      this.changeDetectorRef.detectChanges();
    }  else if(this.selectedOption.beiType === 'DOT'){
      this.inputPlaceholder = '5 to 8 alphanumeric characters';
      this.errorMessage = 'DOT issued number must be a five to eight character alphanumeric code';
      this.changeDetectorRef.detectChanges();
    }  else if(this.selectedOption.beiType === 'IATA'){
      this.inputPlaceholder = '1 to 15 alphanumeric characters';
      this.errorMessage = '	1 to15 character alphanumeric code';
    } else if(this.selectedOption.beiType === 'MID'){
      this.inputPlaceholder = 'Max 15 characters. First 2 must be ISO code';
      this.errorMessage = 'Manufacturer ID must be a maximum of 15 alphanumeric characters and the first two characters must be the alphabetical ISO Country Code';
      this.changeDetectorRef.detectChanges();
    } else if(this.selectedOption.beiType === 'IOR'){
       this.inputPlaceholder = '###-##-#### or ##-####### or ######-#####';
      this.errorMessage = 'IOR Number must be in the format of ###-##-#### or ##-####### (Last two characters are alphanumeric), or ######-#####';
      this.changeDetectorRef.detectChanges();
    } else if(this.selectedOption.beiType === 'Broker License Number'){
      this.inputPlaceholder = '4 to 5 numeric code';
      this.errorMessage = 'License Serial Number must be a four or five numeric code';
      this.changeDetectorRef.detectChanges();
    } else if(this.selectedOption.beiType === 'EIN'){
      this.inputPlaceholder = 'format ##-#######';
      this.errorMessage = 'EIN must be in the format of ##-#######';
      this.changeDetectorRef.detectChanges();
    } else if(this.selectedOption.beiType === 'DUNS'){
      this.inputPlaceholder = 'format ##-###-####';
      this.errorMessage = 'Dun and Bradstreet Number must be Nine Digit Number or must be in the format of ##-###-####, but is not required';
      this.changeDetectorRef.detectChanges();
    } else if(this.selectedOption.beiType === 'Filer Code'){
      this.inputPlaceholder = '3 alphanumeric characters';
      this.errorMessage = 'Filer Code for must be a 3 character alphanumeric code';
      this.changeDetectorRef.detectChanges();
    } else if(this.selectedOption.beiType === 'SCT Number'){
      this.inputPlaceholder = '5-8 or 12-13 alphanumeric characters';
      this.errorMessage = 'SCT number must be 5-8 or 12-13 digit alphanumeric code';
      this.changeDetectorRef.detectChanges();
    } else if(this.selectedOption.beiType === 'ACE FAST ID' || this.selectedOption.beiType === 'TSA'){
      this.inputPlaceholder = 'BEI Required';
      this.errorMessage = 'BEI Required';
      this.changeDetectorRef.detectChanges();
    }

    this.showError = false;
    this.inputValue = '';
  }


}

