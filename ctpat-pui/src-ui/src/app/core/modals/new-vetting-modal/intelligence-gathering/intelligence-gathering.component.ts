import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-intelligence-gathering',
  templateUrl: './intelligence-gathering.component.html',
  styleUrls: ['./intelligence-gathering.component.scss']
})
export class IntelligenceGatheringComponent implements OnInit {

  public intelligenceGatheringForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.intelligenceGatheringForm = this.formBuilder.group({
      portalMilestonesIndicator: new FormControl(''),
      portalCompanyHistoryIndicator: new FormControl(''),
      portalDocumentExchangeIndicator: new FormControl(''),
      portalCompanyNameIndicator: new FormControl(''),
      portalBeiSearchIndicator: new FormControl(''),
      portalUserIdIndicator: new FormControl(''),
      portalQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      derogatoryIndicator: new FormControl(''),
      prevAccountNum: new FormControl(''),
      prevAccountName: new FormControl(''),
      prevDerogatoryInformation: new FormControl(''),
      /////////////////////////////////////////////////
      atsAdvIorSearchIndicator: new FormControl(''),
      atsNumImportRecords: new FormControl(''),
      atsSearchRange: new FormControl(''),
      atsBeiQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      osCompanyNameIndicator: new FormControl(''),
      osCompanyNameNewsIndicator: new FormControl(''),
      osCompanyDbaIndicator: new FormControl(''),
      osWebsiteIndicator: new FormControl(''),
      osPhoneNumberIndicator: new FormControl(''),
      osCompanyAddressIndicator: new FormControl(''),
      osQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      usCompanyNameIndicator: new FormControl(''),
      usAddressIndicator: new FormControl(''),
      usPhoneNumberIndicator: new FormControl(''),
      companyOwnerIndicator: new FormControl(''),
      nexisQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      afiBeiIndicator: new FormControl(''),
      afiCompanyNameIndicator: new FormControl(''),
      afiCompanyAddressIndicator: new FormControl(''),
      afiCompanyPhoneNumberIndicator: new FormControl(''),
      afiOwnerEmailIndicator: new FormControl(''),
      afiOwnerPhoneIndicator: new FormControl(''),
      afiCompanyOwnerIndicator: new FormControl(''),
      afiResponse: new FormControl(''),
      /////////////////////////////////////////////////
      sqBusinessNameIndicator: new FormControl(''),
      sqAddressIndicator: new FormControl(''),
      sqOwnerIndicator: new FormControl(''),
      sqCriminalHistoryIndicator: new FormControl(''),
      sqGlobalEnrollmentIndicator: new FormControl(''),
      sqResponse: new FormControl(''),
      /////////////////////////////////////////////////
      diceQueryIndicator: new FormControl(''),
      diceQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      queriesRun1: new FormControl(''),
      queriesRun2: new FormControl(''),
      nameSme: new FormControl(''),
    });
  }

}
