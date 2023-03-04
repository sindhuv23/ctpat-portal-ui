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

  displayedColumns: string[] = ['selectionId', 'question'];
  public dataSourceQuestions = new MatTableDataSource<any>();
  public businessTypeList$!: Observable<any>;
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
      typeName: new FormControl('', Validators.required),
      street1: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      street2: new FormControl(''),
      countryId: new FormControl('', Validators.required),
      stateId: new FormControl(''),
      salutationId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      middleNameInitial: new FormControl('', Validators.maxLength(1)),
      contactType: new FormControl('', Validators.required),
      fax: new FormControl('')
    });
    this.businessTypeList$ = this.accountService.getRefData('getBusinessTypeList');
    this.addressTypeList$ = this.accountService.getRefData('getAddressTypeList');
    this.accountService.getAccountData('getStateList').subscribe(states=> this.stateList = states);
    this.countryList$ = this.accountService.getAccountData('getCountryList'); 
    this.salutation$ = this.accountService.getAccountData('getSalutationList'); 
    this.ownershipType$ = this.accountService.getAccountData('getOwnershipTypeLkpList'); 
  }

  businessTypeSelected(event: any): void {
    const businessType = this.createAccountForm.get('businessType')?.value;
    if (!businessType) {
      this.showEligibilityQuestions = false;
    }
    else if (businessType === 'importer'){ // pull corresponding questions based on type
      this.showEligibilityQuestions = true;

      const data: any[] = [{selectionId: 'qid01', question: 'Question 1 from database Question 1 from database Question 1 from database Question 1 from database Question 1 from database Question 1 from database'},
      {selectionId: 'qid02', question: 'Question 2 from database Question 2 from database Question 2 from database'},
      {selectionId: 'qid03', question: 'Question 3 from database Question 3 from database Question 3 from database'},
      {selectionId: 'qid04', question: 'Question 4 from database Question 4 from database Question 4 from database'},
      {selectionId: 'qid05', question: 'Question 5 from database Question 5 from database Question 5 from database'}];
      this.dataSourceQuestions = new MatTableDataSource<any>(data);
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


  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.createAccountForm.invalid){
      return;
   }

    this.accountService.saveAccountData(this.createAccountForm.getRawValue()).subscribe(res => {
      console.log('Ctpat Account data saved, response => '+ res);
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