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
      portalMilestones: new FormControl(''),
      portalCompanyHist: new FormControl(''),
      portalDocExchange: new FormControl(''),
      portalCompanySearch: new FormControl(''),
      portalBeiSearch: new FormControl(''),
      portalPocCheck: new FormControl(''),
      portalAdditionalText: new FormControl(''),

      derogatoryIndicator: new FormControl(''),
      prevAccountNum: new FormControl(''),
      prevAccountName: new FormControl(''),
      prevDerogatoryInformation: new FormControl(''),
      /////////////////////////////////////////////////
      osCompanyName: new FormControl(''),
      osWebsite: new FormControl(''),
      osCompanyNews: new FormControl(''),
      osPhone: new FormControl(''),
      osCompanyDba: new FormControl(''),
      osCompanyAddress: new FormControl(''),
      osAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      bqBond: new FormControl(''),
      bqAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      fmcbqNvocc: new FormControl(''),
      fmcbqBond: new FormControl(''),
      fmcBondAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      atsExportEin: new FormControl(''),
      atsExportNumber: new FormControl(''),
      atsExportDuns: new FormControl(''),
      atsExportSearchRange: new FormControl(''),
      atsExportAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      midNumQuery: new FormControl(''),
      midCompanyName: new FormControl(''),
      midAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      dotCompanyName: new FormControl(''),
      dotUsdotNum: new FormControl(''),
      dotAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      satRfc: new FormControl(''),
      satAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      fmcMtoNum: new FormControl(''),
      fmcAddtionalText: new FormControl(''),
      /////////////////////////////////////////////////
      scacCode: new FormControl(''),
      bondscacQuery: new FormControl(''),
      bondscacAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      bondFmcQuery: new FormControl(''),
      bondFmcMtoNum: new FormControl(''),
      bondFmcAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      lexisnexisCompanyName: new FormControl(''),
      lexisnexisPocs: new FormControl(''),
      lexisnexisUsAddress: new FormControl(''),
      lexisnexisPhone: new FormControl(''),
      lexisnexisAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      afiBei: new FormControl(''),
      afiCompanyPhone: new FormControl(''),
      afiOwnerPocsName: new FormControl(''),
      afiCompanyName: new FormControl(''),
      afiOwnerPocsEmail: new FormControl(''),
      afiCompanyAddress: new FormControl(''),
      afiOwnerPocsPhone: new FormControl(''),
      afiAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      atsBeiSearch: new FormControl(''),
      atsBeiImports: new FormControl(''),
      atsBeiSearchRange: new FormControl(''),
      atsBeiAdditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      irsNgBusinessName: new FormControl(''),
      irsNgCriminalHist: new FormControl(''),
      irsNgAddresses: new FormControl(''),
      irsNgGlobal: new FormControl(''),
      irsNgOwnerPocs: new FormControl(''),
      irsNgAditionalText: new FormControl(''),
      /////////////////////////////////////////////////
      diceQuery: new FormControl(''),
      diceAddtionalText: new FormControl(''),
      /////////////////////////////////////////////////
      additionalQueryRun: new FormControl(''),
      additionalDerogatoryResults: new FormControl(''),
      additionalSme: new FormControl(''),
      queriesRun1: new FormControl(''),
      queriesRun2: new FormControl('')
    });
    console.log(this.businessType);
    this.intelligenceGatheringQuestionnaire = getQuestionsByBusinessFunction(this.businessType);
  }

}
