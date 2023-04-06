import { AccountService } from 'src/app/core/services/account.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.component.html',
  styleUrls: ['./add-company-modal.component.scss']
})
export class AddCompanyModalComponent implements OnInit {

  public submitted = false;
  public createCompanyForm!: FormGroup;
  public ownershipType$!: Observable<any>;

  constructor(public dialogRef: MatDialogRef<AddCompanyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    const companyInfo  = this.data.companyInfo;
    this.submitted = false;
    this.createCompanyForm = this.formBuilder.group({
      entryId: new FormControl(companyInfo?.entryId),
      companyName: new FormControl(companyInfo?.companyName),
      doingBusinessAs: new FormControl(companyInfo?.doingBusinessAs, Validators.required),
      businessPhone: new FormControl(companyInfo?.businessPhone, Validators.required),
      businessFax: new FormControl(companyInfo?.businessFax, Validators.required),
      ownershipTypeId: new FormControl(companyInfo?.ownershipType, Validators.required),
      yearsInBusiness: new FormControl(companyInfo?.yearsInBusiness, Validators.required),
      numberOfEmployess: new FormControl(companyInfo?.numberOfEmployess, Validators.required),
      businessWebsiteAddress: new FormControl(companyInfo?.businessWebsiteAddress, Validators.required)
    });
    this.ownershipType$ = this.accountService.getAccountData('getOwnershipTypeLkpList'); 
  }

  get f(): {[key: string]: AbstractControl} {
    return this.createCompanyForm.controls;
  }

  save(): void {
    this.submitted = true;
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
