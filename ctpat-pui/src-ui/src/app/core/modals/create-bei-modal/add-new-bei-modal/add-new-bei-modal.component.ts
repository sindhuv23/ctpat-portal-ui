import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
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

  constructor(public dialogRef: MatDialogRef<AddNewBeiModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, 
              private accountService: AccountService, private beiCrudService: BeiAccountCrudService,
              private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.submitted = false;

    this.addNewBeiForm = this.formBuilder.group({
      beiType: new FormControl('', Validators.required),
      beiValue: new FormControl('', Validators.required)
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
}

