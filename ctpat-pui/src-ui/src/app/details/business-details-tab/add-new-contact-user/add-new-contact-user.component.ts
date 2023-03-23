import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessDetailsService } from 'src/app/core/services/business-details.service';
import { Salutation, TradeUser } from 'src/app/core/utils/cbp.theme';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AccountService } from '../../../core/services/account.service';
import { NonNullAssert } from '@angular/compiler';

@Component({
  selector: 'app-add-new-contact-user',
  templateUrl: './add-new-contact-user.component.html',
  styleUrls: ['./add-new-contact-user.component.scss']
})
export class AddNewContactUserComponent implements OnInit {
  public businessContact!: TradeUser;
  public addNewContactOrUser! : FormGroup;
  public submitted = false;
  public selectedContactTypeValue!: string;
  public stateList!: Array<any>;
  public stateDisplayList: Array<any> = [];
  public selectedConsultantCompany!: string;
  public contactData! : any;
  public salutations! : Observable<any>;
  public countries! : Observable<any>;
  public title! : string;
  public serviceResponse! : string;
  public companyNames! : Observable<any>;
  public ctpatAccountElement! : ElementRef;
  public tcInd! : string;


  constructor(public dialogRef: MatDialogRef<AddNewContactUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private businessDetailsService : BusinessDetailsService,
    private accountService : AccountService) {
   
     }
  

  ngOnInit(): void {


    this.submitted = false;
     
      

      this.addNewContactOrUser = this.formBuilder.group({
        email : new FormControl('', Validators.required),
        salutationId : new FormControl('', Validators.required),
        lastName : new FormControl('', Validators.required),
        firstName : new FormControl('', Validators.required),
        receiveCtpatEmailInd : new FormControl('', Validators.required),
        contactType : new FormControl('', Validators.required),
        title : new FormControl('', Validators.required),
        middleNameInitial : new FormControl(''),
        phoneNumber : new FormControl('', Validators.required),
        stateId : new FormControl('', Validators.required),
        countryId: new FormControl('', Validators.required),
        addressLine2: new FormControl(''),
        consultantBusinessId: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required),
        cityName: new FormControl('', Validators.required),
        addressLine1: new FormControl('', Validators.required),
        consultantCompanyName: new FormControl('', Validators.required),
        consultantCompany: new FormControl('', Validators.required),
        existingConsultantCompanyName : new FormControl('', Validators.required),
        receiveTcEmailInd: new FormControl('', Validators.required),
        tradeUserId: new FormControl(),
        tradeUserXRefId: new FormControl(),
        consultantId: new FormControl(),
        ctpatAccountId: new FormControl()
      });

      let source = this.data.source;
      if(source == 'edit') {
          this.title = "Edit Contact/User";
      } else {
        this.title = "Add New Contact/User";
      }

      this.accountService.accountId$.subscribe((id: any) => {
        if(id) {
          this.addNewContactOrUser.controls['ctpatAccountId'].setValue(id);
          this.accountService.getAccountDetails(id).subscribe((data: any) => {
            if (data) {
              this.tcInd = data.tcInd;
              if(this.tcInd === 'Y') {
                this.addNewContactOrUser.controls['receiveTcEmailInd'].enable();
              } else {
                this.addNewContactOrUser.controls['receiveTcEmailInd'].disable();
              }
            }
          }, error => {
            
          });
        }

      } );

      this.countries = this.businessDetailsService.getAccountData('getCountryList'); 
      this.salutations = this.businessDetailsService.getAccountData('getSalutationList'); 
      
      this.businessDetailsService.getUserDetsByEmail(this.data.email).
      then((data : TradeUser) => {

        if(data.tradeUserId != null || data.tradeUserId != '') {
          this.addNewContactOrUser.controls['tradeUserId'].setValue(data.tradeUserId);
        }

        if(data.tradeUserXRefId != null || data.tradeUserXRefId != '') {
          this.addNewContactOrUser.controls['tradeUserXRefId'].setValue(data.tradeUserXRefId);
        }

        if(data.consultantId != null || data.consultantId != '') {
          this.addNewContactOrUser.controls['consultantId'].setValue(data.consultantId);
        }
    
        
        if(data.email === null || data.email === '') {
          this.addNewContactOrUser.controls['email'].setValue(this.data.email);
          this.addNewContactOrUser.controls['email'].disable();
        }


          this.businessContact = data;
        
          if(data.email != null) {
            this.addNewContactOrUser.controls['email'].setValue(data.email);
            
          }
          if(data.salutationId != null) {
            this.addNewContactOrUser.controls['salutationId'].setValue(data.salutationId);
            
          }
        
          if(data.lastName != null) {
            this.addNewContactOrUser.controls['lastName'].setValue(data.lastName);
            
          }
          if(data.firstName != null) {
            this.addNewContactOrUser.controls['firstName'].setValue(data.firstName);
            
          }
          if(data.title != null) {
            this.addNewContactOrUser.controls['title'].setValue(data.title);
            
          }
          if(data.middleNameInitial != null) {
            this.addNewContactOrUser.controls['middleNameInitial'].setValue(data.middleNameInitial);
            
          }
          if(data.phoneNumber != null) {
            this.addNewContactOrUser.controls['phoneNumber'].setValue(data.phoneNumber);
            
          }

          if(data.contactType != null) {
            this.addNewContactOrUser.controls['contactType'].setValue(data.contactType);
         
          }

          if(data.receiveCtpatEmailInd != null) {
            this.addNewContactOrUser.controls['receiveCtpatEmailInd'].setValue(data.receiveCtpatEmailInd);
      
          }

          if(data.receiveTcEmailInd != null) {
            this.addNewContactOrUser.controls['receiveTcEmailInd'].setValue(data.receiveTcEmailInd);
      
          }



          if(data.addressLine1 != null) {
            this.addNewContactOrUser.controls['addressLine1'].setValue(data.addressLine1);
          }

          if(data.consultantCompanyName != null) {
            this.addNewContactOrUser.controls['consultantCompanyName'].setValue(data.consultantCompanyName);
            this.addNewContactOrUser.controls['existingConsultantCompanyName'].setValue('');
          }

          if(data.cityName != null) {
            this.addNewContactOrUser.controls['cityName'].setValue(data.cityName);
          }

          if(data.postalCode != null) {
            this.addNewContactOrUser.controls['postalCode'].setValue(data.postalCode);
          }
          if(data.consultantBusinessId != null) {
            this.addNewContactOrUser.controls['consultantBusinessId'].setValue(data.consultantBusinessId);
          }
          if(data.addressLine2 != null) {
            this.addNewContactOrUser.controls['addressLine2'].setValue(data.addressLine2);
          }
          if(data.countryId != null) {
            this.addNewContactOrUser.controls['countryId'].setValue(data.countryId);
           // this.stateDisplayList = this.stateList.filter(state => state.countryId == data.countryId);
          }
          if(data.stateId != null) {
            this.addNewContactOrUser.controls['stateId'].setValue(data.stateId);
          }
       
          if(data.consultantId != null) {
       
            this.addNewContactOrUser.controls['consultantCompany'].setValue('Add New');
            this.selectedConsultantCompany = 'Add New';
          }
            
          
          this.addNewContactOrUser.controls['email'].disable();
          if(data.tradeUserId != null) {
            this.addNewContactOrUser.controls['salutationId'].disable();
            this.addNewContactOrUser.controls['lastName'].disable();
            this.addNewContactOrUser.controls['firstName'].disable();
            this.addNewContactOrUser.controls['title'].disable();
            this.addNewContactOrUser.controls['middleNameInitial'].disable();
            this.addNewContactOrUser.controls['phoneNumber'].disable();
          }

          if(data.consultantId != null) {
            this.addNewContactOrUser.controls['contactType'].disable();
            this.addNewContactOrUser.controls['consultantCompany'].disable();
            this.addNewContactOrUser.controls['consultantCompanyName'].disable();
            this.addNewContactOrUser.controls['existingConsultantCompanyName'].disable();
            this.disableCompanyFields();
          }
      }).
      catch((error: any) => {
        console.error('Could not load user info: ' + error);
      });

      this.businessDetailsService.getAccountData('getStateList').subscribe(
        states=>{
            this.stateList = states;
            this.stateDisplayList = this.stateList.filter(
              state => 
                state.countryId == this.addNewContactOrUser.controls['countryId'].getRawValue()
              );
            
          }
        );
  }

    save(): void {  
       this.submitted = true;
       if (this.addNewContactOrUser.invalid){
          return;
       }

       this.businessDetailsService.saveOrUpdateUserDets(this.addNewContactOrUser.getRawValue()).subscribe(res => {
       this.dialogRef.close();
       this.accountService.refreshCtpatContact(res);
      });
   
    }
  
  cancel() : void {
    this.dialogRef.close();
  }

  onContactTypeChange(contactId: any): void {

    this.addNewContactOrUser.controls['consultantCompanyName'].setValue('');
    this.addNewContactOrUser.controls['existingConsultantCompanyName'].setValue('');
    this.addNewContactOrUser.controls['addressLine1'].setValue('');
    this.addNewContactOrUser.controls['cityName'].setValue('');
    this.addNewContactOrUser.controls['postalCode'].setValue('');
    this.addNewContactOrUser.controls['consultantBusinessId'].setValue('');
    this.addNewContactOrUser.controls['addressLine2'].setValue('');
    this.addNewContactOrUser.controls['countryId'].setValue('');
    this.addNewContactOrUser.controls['stateId'].setValue('');
    this.addNewContactOrUser.controls['consultantCompany'].setValue('');
  
    this.disableCompanyFields();

    if(contactId === 'C') {
      this.addNewContactOrUser.controls['consultantCompany'].enable();
      this.addNewContactOrUser.controls['consultantCompanyName'].enable();
      this.addNewContactOrUser.controls['existingConsultantCompanyName'].enable();
    } else {
      this.addNewContactOrUser.controls['consultantCompany'].disable();
      this.addNewContactOrUser.controls['consultantCompanyName'].disable();
      this.addNewContactOrUser.controls['existingConsultantCompanyName'].disable();
    }

  }

  onCountryChange(countryId: any): void {
    this.stateDisplayList = this.stateList.filter(state => state.countryId == countryId);
  }

  onCCSelectChange(ccValue: any): void {

    this.resetCompanyFields();
    
    if(ccValue === 'Select Existing') {
      this.companyNames = this.businessDetailsService.getExistingCompanyNames();
      this.addNewContactOrUser.controls['existingConsultantCompanyName'].enable();
      this.addNewContactOrUser.controls['consultantCompanyName'].disable();
    } else if(ccValue === 'Add New') {
      this.enableCompanyFields();
      this.addNewContactOrUser.controls['consultantCompanyName'].enable();
      this.addNewContactOrUser.controls['existingConsultantCompanyName'].disable();
    } else {
      this.disableCompanyFields();
      this.addNewContactOrUser.controls['consultantCompanyName'].disable();
      this.addNewContactOrUser.controls['existingConsultantCompanyName'].disable();
    }
  }

  resetCompanyFields() {
    this.addNewContactOrUser.controls['consultantCompanyName'].setValue('');
    this.addNewContactOrUser.controls['existingConsultantCompanyName'].setValue('');
    this.addNewContactOrUser.controls['addressLine1'].setValue('');
    this.addNewContactOrUser.controls['cityName'].setValue('');
    this.addNewContactOrUser.controls['postalCode'].setValue('');
    this.addNewContactOrUser.controls['consultantBusinessId'].setValue('');
    this.addNewContactOrUser.controls['addressLine2'].setValue('');
    this.addNewContactOrUser.controls['countryId'].setValue('');
    this.addNewContactOrUser.controls['stateId'].setValue('');
    this.stateDisplayList = [];
  }

  disableCompanyFields() : void {
    this.addNewContactOrUser.controls['cityName'].disable();
    this.addNewContactOrUser.controls['addressLine1'].disable();
    this.addNewContactOrUser.controls['postalCode'].disable();
    this.addNewContactOrUser.controls['consultantBusinessId'].disable();
    this.addNewContactOrUser.controls['addressLine2'].disable();
    this.addNewContactOrUser.controls['countryId'].disable();
    this.addNewContactOrUser.controls['stateId'].disable();
  }

  enableCompanyFields() : void {
    this.addNewContactOrUser.controls['cityName'].enable();
    this.addNewContactOrUser.controls['addressLine1'].enable();
    this.addNewContactOrUser.controls['postalCode'].enable();
    this.addNewContactOrUser.controls['consultantBusinessId'].enable();
    this.addNewContactOrUser.controls['addressLine2'].enable();
    this.addNewContactOrUser.controls['countryId'].enable();
    this.addNewContactOrUser.controls['stateId'].enable();
  }

  onCompanySelectChange(companyId: any): void {
    
    this.addNewContactOrUser.controls['consultantCompanyName'].setValue('');
    if(this.addNewContactOrUser.controls['existingConsultantCompanyName'].getRawValue() === '') {
        this.enableCompanyFields();
        this.resetCompanyFields();
    } else {
        this.businessDetailsService.getCompanyInfo(this.addNewContactOrUser.controls['existingConsultantCompanyName'].getRawValue()).
        then((data : TradeUser) => {
            this.addNewContactOrUser.controls['addressLine1'].setValue(data.addressLine1);
            this.addNewContactOrUser.controls['cityName'].setValue(data.cityName);
            this.addNewContactOrUser.controls['postalCode'].setValue(data.postalCode);
            this.addNewContactOrUser.controls['consultantBusinessId'].setValue(data.consultantBusinessId);
            this.addNewContactOrUser.controls['addressLine2'].setValue(data.addressLine2);
            this.addNewContactOrUser.controls['countryId'].setValue(data.countryId);
            this.addNewContactOrUser.controls['stateId'].setValue(data.stateId);
            this.addNewContactOrUser.controls['consultantId'].setValue(data.consultantId);
            this.stateDisplayList = this.stateList.filter(state => state.countryId == data.countryId);
            this.disableCompanyFields();
        });
  }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addNewContactOrUser.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addNewContactOrUser.controls;
  }


}
