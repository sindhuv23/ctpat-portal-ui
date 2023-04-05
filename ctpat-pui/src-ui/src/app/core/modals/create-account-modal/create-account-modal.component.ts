import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit,  OnDestroy {

  public createAccountForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  public showEligibilityQuestions = false;
  public eligibilityQuestions: any[] = [];
  public wrongSelection = false;

  displayedColumns: string[] = ['eligibilityCatalogId', 'question'];
  public dataSourceQuestions = new MatTableDataSource<any>();
  public businessTypeList: Array<any> = [];
  public addressTypeList$!: Observable<any>;
  public stateList!: Array<any>;
  public stateDisplayList: Array<any> = [];
  public countryList$!: Observable<any>;
  public salutation$!: Observable<any>;
  public ownershipType$!: Observable<any>;

  constructor(public dialogRef: MatDialogRef<CreateAccountModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.submitted = false;

    this.createAccountForm = this.formBuilder.group({
      companyName: new FormControl('', Validators.required),
      doingBusinessAs: new FormControl(''),
      ownershipTypeId: new FormControl('', Validators.required),
      businessTypeId: new FormControl('', Validators.required),
      businessStartDate: new FormControl('', Validators.required),
      telephoneNumber: new FormControl('', Validators.required),
      faxNumber: new FormControl(''),
      webSiteAddress: new FormControl(''),
      numberOfEmployees: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      briefCompanyHistory: new FormControl('', Validators.required),
      typeNameId: new FormControl('', Validators.required),
      street1: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      street2: new FormControl(''),
      countryId: new FormControl('', Validators.required),
      stateId: new FormControl(''),
      isMailingAddress: new FormControl(''),
      salutationId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      middleNameInitial: new FormControl('', Validators.maxLength(1)),
      contactType: new FormControl('O', Validators.required),
      fax: new FormControl('')
    });
    this.accountService.getAccountData('getBusinessTypeList').subscribe(res => this.businessTypeList = res);
    this.addressTypeList$ = this.accountService.getRefData('getAddressTypeList');
    this.accountService.getAccountData('getStateList').subscribe(states=> this.stateList = states);
    this.countryList$ = this.accountService.getAccountData('getCountryList'); 
    this.salutation$ = this.accountService.getAccountData('getSalutationList'); 
    this.ownershipType$ = this.accountService.getAccountData('getOwnershipTypeLkpList'); 
  }

  businessTypeSelected(event: any): void {
  let businessTypeId = this.createAccountForm.get('businessTypeId')?.value;
   const businessType =  this.businessTypeList.find(obj => obj.id === businessTypeId).businessType;
   if(businessType === 'Highway Carrier - U.S. / Mexico' || businessType === 'Highway Carrier - U.S. / Canada'){
    businessTypeId = this.businessTypeList.find(obj => obj.businessType === 'Highway Carrier').id;
   }
    this.populateEligibilityQuestions(businessTypeId);
  }

  populateEligibilityQuestions(businessTypeId: any){
    this.showEligibilityQuestions = false;
    this.wrongSelection = false;
    this.accountService.getEligibilityQuestionsByBusinessTypeId(businessTypeId).subscribe((res: any[])=>{
      if(res && res.length>0){
        this.showEligibilityQuestions = true;
      }
      this.eligibilityQuestions = res;
      this.dataSourceQuestions = new MatTableDataSource<any>(res);
    })
  }

  verifiSelection(row: any, selection: string){
    const objIndex = this.eligibilityQuestions.findIndex((obj => obj.eligibilityCatalogId === row.eligibilityCatalogId));
    this.eligibilityQuestions[objIndex].answer = selection;
    if(this.eligibilityQuestions
      .filter(obj => !(obj.answer === undefined || obj.answer === null))
      .filter(obj => obj.answerToProceed !== obj.answer).length >0){
        this.wrongSelection = true;
    } else {
      this.wrongSelection = false;
    }
    
    
  }
  
  populateStates(countryId: any): void {
    this.stateDisplayList = this.stateList.filter(state => state.countryId == countryId);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.createAccountForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.createAccountForm.controls;
  }

  isFormInvalid(): boolean{
    return (this.createAccountForm.invalid || this.wrongSelection || this.eligibilityQuestions.filter(obj => obj.answerToProceed !== obj.answer).length > 0)
  }

  save(): void {
    this.submitted = true;
    // UI validation before this point
    if (this.isFormInvalid()){
      return;
   }
   const account = this.createAccountForm.getRawValue();
   account.isMailingAddress = account.isMailingAddress ? 'Y' : 'N';
   account.eligibilityInd ='Y';
    this.accountService.saveAccountData(account).subscribe(res => {
      console.log('Ctpat Account data saved, response => '+ res);
      this.accountService.broadcastDetailLoadingStatus(true);
      this.accountService.broadcastAccountId(res.id);
      this.accountService.broadcastBusinessTypeId(res.businessTypeId);
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  clear(): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
} 