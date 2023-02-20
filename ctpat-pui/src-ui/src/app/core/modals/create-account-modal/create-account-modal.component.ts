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

  constructor(public dialogRef: MatDialogRef<CreateAccountModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.submitted = false;

    this.createAccountForm = this.formBuilder.group({
      companyName: new FormControl('', Validators.required),
      doingBusinessAs: new FormControl(''),
      ownershipType: new FormControl('', Validators.required),
      businessType: new FormControl('', Validators.required),
      businessStartDate: new FormControl('', Validators.required),
      telephoneNumber: new FormControl('', Validators.required),
      faxNumber: new FormControl(''),
      website: new FormControl(''),
      numberOfEmployees: new FormControl('', Validators.required),
      briefCompanyHistory: new FormControl('', Validators.required),
      typeAddress: new FormControl('', Validators.required),
      typeContact: new FormControl('', Validators.required),
      addressLineOne: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      addressLineTwo: new FormControl(''),
      country: new FormControl('', Validators.required),
      state: new FormControl(''),
      salutation: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      initial: new FormControl(''),
      contactType: new FormControl('', Validators.required),
      fax: new FormControl('')
    });
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

  public hasError = (controlName: string, errorName: string) => {
    return this.createAccountForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.createAccountForm.controls;
  }

  public getRefData(refType: string) : Observable<any> {
    return this.accountService.getRefData(refType);
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.createAccountForm.invalid){
      return;
    }

    console.log('other validations then save');
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
