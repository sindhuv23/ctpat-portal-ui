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
      entryId: new FormControl(row?.entryId),
      firstName: new FormControl(row?.firstName),
      lastName: new FormControl(row?.lastName, Validators.required),
      middleInitial: new FormControl(row?.middleInitial),
      dateOfBirth: new FormControl(row?.dateOfBirth),
      countryOfBirthId: new FormControl(row?.countryOfBirth),
      countryOfCitizenshipId: new FormControl(row?.countryOfCitizenship),
      email: new FormControl(row?.email),
      phone: new FormControl(row?.phone),

      passportNumber: new FormControl(row?.passportNumber),
      passportCountry: new FormControl(row?.passportCountry),
      visaType: new FormControl(row?.visaType),
      visaNumber: new FormControl(row?.visaNumber),

      alienNum: new FormControl(row?.alienNum),
      naturalizationNum: new FormControl(row?.naturalizationNum),
      lpr: new FormControl(row?.lpr),
      dlnNumber: new FormControl(row?.dlnNumber),
      dlnCountryId: new FormControl(row?.dlnCountry),
      dlnStateId: new FormControl(row?.dlnState),
      nexus: new FormControl(row?.nexus),
      centri: new FormControl(row?.centri),
      globalEntry: new FormControl(row?.globalEntry),
      ssn: new FormControl(row?.ssn),
      sin: new FormControl(row?.sin),
      rfc: new FormControl(row?.rfc)

    });
    this.accountService.getAccountData('getStateList').subscribe(states=> this.stateList = states);
    this.countryList$ = this.accountService.getAccountData('getCountryList'); 
  }

  get f(): {[key: string]: AbstractControl} {
    return this.createCompanyContactForm.controls;
  }

  populateStates(countryId: any): void {
    this.stateDisplayList = this.stateList.filter(state => state.countryId == countryId);
  }

  save(): void {
    this.submitted = true;
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
