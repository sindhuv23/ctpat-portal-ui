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
  selector: 'app-edit-country-of-origin-modal',
  templateUrl: './edit-country-of-origin-modal.component.html',
  styleUrls: ['./edit-country-of-origin-modal.component.scss']
})
export class EditCountryOfOriginModalComponent implements OnInit, OnDestroy {

  public editCooForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  public ctpatAccountId = '';
  public coInEdit: any;

  public countryList: any;
  public stateList: any;
  public cityList: any;

  public showPercentageSumError = false;
  private dataCountriesOfOrigin: any[] = [];

  constructor(public dialogRef: MatDialogRef<EditCountryOfOriginModalComponent>, public referenceService: ReferenceService,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
              private accountService: AccountService, private beiTabService: BeiTabService, private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.ctpatAccountId = this.data.ctpatAccountId;

    // country data should be populated from database with account ID
    this.editCooForm = this.formBuilder.group({
      percentageImports: new FormControl('', [Validators.required, percentageFormatValidator()]),
      suggestedIndicator: new FormControl(false),
      countryOfOrigin: new FormControl({value: '', disabled: true}),
      stateOfOrigin: new FormControl({value: '', disabled: true}),
      cityOfOrigin: new FormControl({value: '', disabled: true}),
    });

    this.getCurrentCos();
    this.getRefData();
    this.populateFields();
  }

  getRefData(): void{
    this.countryList = this.referenceService.getCountryList();
    this.coInEdit = this.data.dataCoInternal.filter((co: any) => co.id === this.data.id);
    if (this.coInEdit){
      this.stateList = this.referenceService.getStateListByCountry(this.coInEdit[0].country_id);
      this.cityList = this.referenceService.getCityListByState(this.coInEdit[0].state_id);
    }
  }

  populateFields(): void{
    if (this.coInEdit){
      this.editCooForm.get('percentageImports')?.setValue(this.coInEdit[0].percentage_of_import);
      this.editCooForm.get('suggestedIndicator')?.setValue(this.coInEdit[0].preferred_rank == '1');
      this.editCooForm.get('countryOfOrigin')?.setValue(this.coInEdit[0].country_id);
      this.editCooForm.get('stateOfOrigin')?.setValue(this.coInEdit[0].state_id);
      this.editCooForm.get('cityOfOrigin')?.setValue(this.coInEdit[0].city_id);
    }
  }

  getCurrentCos(): void{
    if (this.data.dataCoInternal){
      for (const record of this.data.dataCoInternal){
        this.dataCountriesOfOrigin.push({percentageImports: record.percentage_of_import, countryOfOrigin: record.country_id,
          stateOfOrigin: record.state_id, cityOfOrigin: record.city_id, entryId: this.dataCountriesOfOrigin.length});
      }
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editCooForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editCooForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.editCooForm.invalid || this.showPercentageSumError){
      return;
    }

    const rawValues = this.editCooForm.getRawValue();

    const coData = {percentageImports: rawValues.percentageImports.trim(), suggestedIndicator: (rawValues.suggestedIndicator ? '1' : '0') ,
      id: this.data.id, ctpatAccountId: this.ctpatAccountId};

    this.subscriptions.add(this.beiTabService.updateCoInternal(coData)
    .subscribe((data: any) => {
      this.accountService.broadcastAccountId(parseInt(this.ctpatAccountId, 10));
      this.detailsService.broadcastCurrentTabIndex(1);
      this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.dialogRef.close();
      }));
  }

  validatePercentageSum(): void {
    this.showPercentageSumError = false;
    if (this.editCooForm.get('percentageImports')?.errors?.errorMessageFormat){
      return;
    }
    let coInEditPercentage = 0;
    if (this.coInEdit){
      coInEditPercentage = this.coInEdit[0].percentage_of_import;
    }
    const percentage = this.editCooForm.get('percentageImports')?.value.trim();
    this.showPercentageSumError = (parseInt(percentage, 10) - coInEditPercentage
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
