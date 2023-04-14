import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { BeiTabService } from 'src/app/core/services/bei-tab.service';
import { DetailsService } from 'src/app/core/services/details.service';
import { ReferenceService } from 'src/app/core/services/reference.service';

@Component({
  selector: 'app-add-country-of-origin-modal',
  templateUrl: './add-country-of-origin-modal.component.html',
  styleUrls: ['./add-country-of-origin-modal.component.scss']
})
export class AddCountryOfOriginModalComponent implements OnInit, OnDestroy {

  public addCooForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  public ctpatAccountId = '';

  public countryList: any;
  public stateList: any;
  public cityList: any;

  public showPercentageSumError = false;
  public showUniqueRecordError = false;
  private dataCountriesOfOrigin: any[] = [];

  constructor(public dialogRef: MatDialogRef<AddCountryOfOriginModalComponent>, public referenceService: ReferenceService,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
              private accountService: AccountService, private beiTabService: BeiTabService, private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.ctpatAccountId = this.data.ctpatAccountId;

    this.addCooForm = this.formBuilder.group({
      percentageImports: new FormControl('', [Validators.required, percentageFormatValidator()]),
      countryOfOrigin: new FormControl('', Validators.required),
      stateOfOrigin: new FormControl({value: '', disabled: true}, Validators.required),
      suggestedIndicator: new FormControl(false),
      cityOfOrigin: new FormControl({value: '', disabled: true}),
    });

    this.getCurrentCos();
    this.getRefData();
  }

  getCurrentCos(): void{
    if (this.data.dataCoInternal){
      for (const record of this.data.dataCoInternal){
        this.dataCountriesOfOrigin.push({percentageImports: record.percentage_of_import, countryOfOrigin: record.country_id,
          stateOfOrigin: record.state_id, cityOfOrigin: record.city_id, entryId: this.dataCountriesOfOrigin.length});
      }
    }
  }

  getRefData(): void{
    this.countryList = this.referenceService.getCountryList();
  }

  countrySelected(id: any): void {
    this.checkRecordUniqueness();
    if (id){
      this.addCooForm.get('stateOfOrigin')?.enable();
      this.stateList = this.referenceService.getStateListByCountry(id);
    } else {
      this.addCooForm.get('stateOfOrigin')?.disable();
      this.addCooForm.get('cityOfOrigin')?.disable();
    }
    this.addCooForm.get('stateOfOrigin')?.setValue(null);
    this.addCooForm.get('cityOfOrigin')?.setValue(null);
  }

  stateSelected(id: any): void {
    this.checkRecordUniqueness();
    if (id){
      this.addCooForm.get('cityOfOrigin')?.enable();
      this.cityList = this.referenceService.getCityListByState(id);
    } else {
      this.addCooForm.get('cityOfOrigin')?.disable();
    }
    this.addCooForm.get('cityOfOrigin')?.setValue(null);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addCooForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addCooForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.addCooForm.invalid || this.showPercentageSumError || this.showUniqueRecordError){
      return;
    }

    const rawValues = this.addCooForm.getRawValue();

    const coData = {percentageImports: rawValues.percentageImports.trim(), suggestedIndicator: (rawValues.suggestedIndicator ? '1' : '0') ,
      countryOfOrigin: rawValues.countryOfOrigin , stateOfOrigin: rawValues.stateOfOrigin , cityOfOrigin: rawValues.cityOfOrigin,
      ctpatAccountId: this.ctpatAccountId};

    this.subscriptions.add(this.beiTabService.saveCoInternal(coData)
    .subscribe((data: any) => {
      this.accountService.broadcastAccountId(parseInt(this.ctpatAccountId, 10));
      this.detailsService.broadcastCurrentTabIndex(1);
      this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.dialogRef.close();
      }));
  }

  checkRecordUniqueness(): void{
    this.showUniqueRecordError = false;
    const selectedCountryId = this.addCooForm.get('countryOfOrigin')?.value;
    const selectedStateId = this.addCooForm.get('stateOfOrigin')?.value;
    if (!selectedCountryId || !selectedStateId || this.dataCountriesOfOrigin.filter(r => r.countryOfOrigin == selectedCountryId
      && r.stateOfOrigin == selectedStateId).length === 0){
        this.showUniqueRecordError = false;
      } else {
        this.showUniqueRecordError = true;
      }
  }

  validatePercentageSum(): void {
    this.showPercentageSumError = false;
    if (this.addCooForm.get('percentageImports')?.errors?.errorMessageFormat){
      return;
    }
    const percentage = this.addCooForm.get('percentageImports')?.value.trim();
    this.showPercentageSumError = (parseInt(percentage, 10)
      + this.dataCountriesOfOrigin.reduce((n, {percentageImports}) => n + parseInt(percentageImports, 10), 0)) > 100;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

export function percentageFormatValidator(): ValidatorFn {
  return (percentageImports: AbstractControl): ValidationErrors | null => {
    if (!percentageImports.value){
      return null;
    }
    const percentage = percentageImports.value.trim();
    return (!(/^\d+$/.test(percentage)) || percentage < 1 || percentage > 100) ?
     {errorMessageFormat: 'Whole number 1 - 100 only'} : null;
  };
}
