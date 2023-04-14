import { AccountService } from 'src/app/core/services/account.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-company-contact-modal',
  templateUrl: './add-company-contact-modal.component.html',
  styleUrls: ['./add-company-contact-modal.component.scss']
})
export class AddCompanyContactModalComponent implements OnInit {

  public submitted = false;
  public createCompanyContactForm!: FormGroup;
  public stateList!: Array<any>;
  public stateDisplayList: Array<any> = [];
  public countryList$!: Observable<any>;
  public salutation$!: Observable<any>;

  constructor(public dialogRef: MatDialogRef<AddCompanyContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    const row  = this.data.row;
    this.submitted = false;
    this.createCompanyContactForm = this.formBuilder.group({
      id: new FormControl(row?.id),
      firstName: new FormControl(row?.firstName, Validators.required),
      lastName: new FormControl(row?.lastName, Validators.required),
      middleNameInitial: new FormControl(row?.middleNameInitial),
      dateOfBirth: new FormControl(row?.dateOfBirth),
      birthCountryId: new FormControl(row?.docDetail[0]?.birthCountryId),
      citizenshipCountryId: new FormControl(row?.docDetail[0]?.citizenshipCountryId),
      email: new FormControl(row?.email),
      telephoneNumber: new FormControl(row?.telephoneNumber),

      passportNum: new FormControl(row?.docDetail[0]?.passportNum),
      passportIssuanceCountryId: new FormControl(row?.docDetail[0]?.passportIssuanceCountryId),
      usVisaType: new FormControl(row?.docDetail[0]?.usVisaType),
      usVisaNum: new FormControl(row?.docDetail[0]?.usVisaNum),

      alienRegNum: new FormControl(row?.docDetail[0]?.alienRegNum),
      naturalizationNum: new FormControl(row?.docDetail[0]?.naturalizationNum),
      lpr: new FormControl(row?.docDetail[0]?.lpr),
      dlnNum: new FormControl(row?.docDetail[0]?.dlnNum),
      dlnIssuanceCountryId: new FormControl(row?.docDetail[0]?.dlnIssuanceCountryId),
      dlnIssuanceStId: new FormControl(row?.docDetail[0]?.dlnIssuanceStId),
      nexus: new FormControl(row?.docDetail[0]?.nexus),
      centri: new FormControl(row?.docDetail[0]?.centri),
      globalEntry: new FormControl(row?.docDetail[0]?.globalEntry),
      ssn: new FormControl(row?.ssn),
      sin: new FormControl(row?.sin),
      rfc: new FormControl(row?.rfc),
      curp: new FormControl(row?.curp)

    });
    this.countryList$ = this.accountService.getAccountData('getCountryList'); 
    this.accountService.getAccountData('getStateList').subscribe(states=> {
      this.stateList = states;
      if(row?.docDetail[0]?.dlnIssuanceCountryId){
          this.populateStates(row?.docDetail[0]?.dlnIssuanceCountryId);
      }
  });
  }

  get f(): {[key: string]: AbstractControl} {
    return this.createCompanyContactForm.controls;
  }

  populateStates(countryId: any): void {
    this.stateDisplayList = this.stateList.filter(state => state.countryId == countryId);
  }

  save(): void {
    this.submitted = true;
    const updatedRecord = this.createCompanyContactForm.getRawValue();
    updatedRecord.docDetail = [{
      passportNum: updatedRecord.passportNum,  
      passportIssuanceCountryId: updatedRecord.passportIssuanceCountryId,
      passportCountry: 'Canada', 
      birthCountryId: updatedRecord.birthCountryId,
      countryOfBirthCd: 'CA', 
      citizenshipCountryId: updatedRecord.citizenshipCountryId,
      countryOfCitizenshipCd: 'CA',  
      countryOfBirth: 'Canada', 
      countryOfCitizenship: 'Canada',
      usVisaType: updatedRecord.usVisaType,
      usVisaNum: updatedRecord.usVisaNum,
      alienRegNum: updatedRecord.alienRegNum,
      naturalizationNum: updatedRecord.naturalizationNum,
      dlnNum: updatedRecord.dlnNum,
      dlnIssuanceCountryId: updatedRecord.dlnIssuanceCountryId,
      dlnCountry: 'Canada', 
      dlnIssuanceStId: updatedRecord.dlnIssuanceStId,
      lpr: updatedRecord.lpr,
      nexus: updatedRecord.nexus,
      centri: updatedRecord.centri,
      globalEntry: updatedRecord.globalEntry,
      }];
      this.dialogRef.close(updatedRecord);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}