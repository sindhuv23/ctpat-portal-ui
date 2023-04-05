import { getQuestionsByBusinessFunction } from './intelligence-gathering-questionnaire';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-intelligence-gathering',
  templateUrl: './intelligence-gathering.component.html',
  styleUrls: ['./intelligence-gathering.component.scss']
})
export class IntelligenceGatheringComponent implements OnInit {

  public intelligenceGatheringForm!: FormGroup;
  public intelligenceGatheringQuestionnaire!: any;
  @Input() businessType = '';

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
      derogatoryIndicator: new FormControl(''),
      prevAccountNum: new FormControl(''),
      prevAccountName: new FormControl(''),
      prevDerogatoryInformation: new FormControl(''),
      /////////////////////////////////////////////////
      opensourceCompanyName: new FormControl(''),
      opensourceWebsite: new FormControl(''),
      opensourceCompanyNameNews: new FormControl(''),
      opensourcePhone: new FormControl(''),
      opensourceDBA: new FormControl(''),
      opensourceAddress: new FormControl(''),
      opensourceQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      bondIndicator: new FormControl(''),
      bondQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      fmcBondCompanyName: new FormControl(''),
      fmcBondNumber: new FormControl(''),
      fmcBondQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      atsEinNumber: new FormControl(''),
      atsExportRecords: new FormControl(''),
      atsDunsNo: new FormControl(''),
      atsSearchRange: new FormControl(''),
      atsQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      midQueryNumber: new FormControl(''),
      midQueryCompanyName: new FormControl(''),
      midQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      dotQueryCompanyName: new FormControl(''),
      dotQueryNumber: new FormControl(''),
      dotQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      satRfc: new FormControl(''),
      satQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      fmcNumber: new FormControl(''),
      fmcQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      bondScacCode: new FormControl(''),
      bondScacNumber: new FormControl(''),
      bondScacQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      bondFmcNumber: new FormControl(''),
      bondFmcMtoNumber: new FormControl(''),
      bondFmcQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      lexisCompanyName: new FormControl(''),
      lexisCompanyOwner: new FormControl(''),
      lexisAddress: new FormControl(''),
      lexisPhone: new FormControl(''),
      lexisQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      analyticalBusinessIdentifier: new FormControl(''),
      analyticalPhone: new FormControl(''),
      analyticalOwner: new FormControl(''),
      analyticalCompanyName: new FormControl(''),
      analyticalOwnerEmail: new FormControl(''),
      analyticalCompanyAddress: new FormControl(''),
      analyticalOwnerPhone: new FormControl(''),
      analyticalQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      atsBeiAdvanceSearch: new FormControl(''),
      atsBeiImportRecords: new FormControl(''),
      atsBeiSearchRange: new FormControl(''),
      atsBeiQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      irsBusinessName: new FormControl(''),
      irsCriminalHistoryResults: new FormControl(''),
      irsQueryAddress: new FormControl(''),
      irsEnrollmentResults: new FormControl(''),
      irsQueryOwner: new FormControl(''),
      irsQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      diceQuery: new FormControl(''),
      diceQueryResponse: new FormControl(''),
      /////////////////////////////////////////////////
      additionalQueryRun: new FormControl(''),
      additionalDerogatoryResults: new FormControl(''),
      additionalSmeName: new FormControl(''),
      queriesRun1: new FormControl(''),
      queriesRun2: new FormControl(''),
      nameSme: new FormControl(''),
    });
    console.log(this.businessType);
    this.intelligenceGatheringQuestionnaire = getQuestionsByBusinessFunction(this.businessType);
  }

}
