import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { BeiTabService } from 'src/app/core/services/bei-tab.service';
import { DetailsService } from 'src/app/core/services/details.service';
import { ReferenceService } from 'src/app/core/services/reference.service';

@Component({
  selector: 'app-edit-co-modal',
  templateUrl: './edit-co-modal.component.html',
  styleUrls: ['./edit-co-modal.component.scss']
})
export class EditCoModalComponent implements OnInit, OnDestroy {

  public editCoForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  public showPercentageSumError = false;
  public showUniqueRecordError = false;
  public showMinCoError = false;
  @ViewChild(MatSort) matSort!: MatSort;

  public ctpatAccountId = '';

  public countryList: any;
  public stateList: any;
  public cityList: any;

  displayedColumnsCountriesOfOrigin: string[] = ['percentageImports', 'countryOfOrigin', 'stateOfOrigin', 'cityOfOrigin', 'entryId'];
  private dataCountriesOfOrigin: any[] = [];
  public dataSourceCountriesOfOrigin = new MatTableDataSource<any>();

  constructor(public dialogRef: MatDialogRef<EditCoModalComponent>, public referenceService: ReferenceService,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
              private accountService: AccountService, private beiTabService: BeiTabService, private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.ctpatAccountId = this.data.ctpatAccountId;

    this.editCoForm = this.formBuilder.group({
      percentageImports: new FormControl('', [Validators.required, percentageFormatValidator()]),
      countryOfOrigin: new FormControl('', Validators.required),
      stateOfOrigin: new FormControl({value: '', disabled: true}, Validators.required),
      cityOfOrigin: new FormControl({value: '', disabled: true})
    });

    this.getRefData();
    this.populateFields();
  }

  populateFields(): void{
    if (this.data.dataCoTrade){
      for (const record of this.data.dataCoTrade){
        this.dataCountriesOfOrigin.push({percentageImports: record.percentage_of_import, countryOfOrigin: record.country_id,
          stateOfOrigin: record.state_id, cityOfOrigin: record.city_id, entryId: this.dataCountriesOfOrigin.length});
        this.dataSourceCountriesOfOrigin = new MatTableDataSource<any>(this.dataCountriesOfOrigin);
        this.dataSourceCountriesOfOrigin.sort = this.matSort;
      }
    }
  }

  getRefData(): void{
    this.countryList = this.referenceService.getCountryList();
  }

  save(): void{
    if (this.dataCountriesOfOrigin.length < 1){
      this.showMinCoError = true;
      return;
    }
    const coData = {coRecords: this.dataCountriesOfOrigin,
    ctpatAccountId: this.ctpatAccountId};

    this.subscriptions.add(this.beiTabService.saveCo(coData)
    .subscribe((data: any) => {
      this.accountService.broadcastAccountId(parseInt(this.ctpatAccountId, 10));
      this.detailsService.broadcastCurrentTabIndex(1);
      this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.dialogRef.close();
      }));
  }

  addCountryOfOrigin(): void{
    if (this.editCoForm.valid && this.dataCountriesOfOrigin.length < 5){
      const formRawValue = this.editCoForm.getRawValue();
      if (formRawValue.percentageImports.trim() && formRawValue.countryOfOrigin && formRawValue.stateOfOrigin){
        this.validatePercentageSum();
        this.checkRecordUniqueness();
        if (this.showPercentageSumError || this.showUniqueRecordError){
          return;
        }
        this.dataCountriesOfOrigin.push({percentageImports: formRawValue.percentageImports.trim(),
          countryOfOrigin: formRawValue.countryOfOrigin,
          stateOfOrigin: formRawValue.stateOfOrigin,
          cityOfOrigin: formRawValue.cityOfOrigin, entryId: this.dataCountriesOfOrigin.length});
        this.dataSourceCountriesOfOrigin = new MatTableDataSource<any>(this.dataCountriesOfOrigin);
        this.dataSourceCountriesOfOrigin.sort = this.matSort;
        this.showMinCoError = false;
      }
    }
  }

  deleteCountryOfOriginEntry(id: any): void{
    this.dataCountriesOfOrigin.splice(id, 1);
    for (let i = 0; i < this.dataCountriesOfOrigin.length; i++) {
     this.dataCountriesOfOrigin[i].entryId = i;
    }
    this.dataSourceCountriesOfOrigin = new MatTableDataSource<any>(this.dataCountriesOfOrigin);
    this.validatePercentageSum();
    this.checkRecordUniqueness();
  }

  countrySelected(id: any): void {
    this.checkRecordUniqueness();
    if (id){
      this.editCoForm.get('stateOfOrigin')?.enable();
      this.stateList = this.referenceService.getStateListByCountry(id);
    } else {
      this.editCoForm.get('stateOfOrigin')?.disable();
      this.editCoForm.get('cityOfOrigin')?.disable();
    }
    this.editCoForm.get('stateOfOrigin')?.setValue(null);
    this.editCoForm.get('cityOfOrigin')?.setValue(null);
  }

  stateSelected(id: any): void {
    this.checkRecordUniqueness();
    if (id){
      this.editCoForm.get('cityOfOrigin')?.enable();
      this.cityList = this.referenceService.getCityListByState(id);
    } else {
      this.editCoForm.get('cityOfOrigin')?.disable();
    }
    this.editCoForm.get('cityOfOrigin')?.setValue(null);
  }

  checkRecordUniqueness(): void{
    this.showUniqueRecordError = false;
    const selectedCountryId = this.editCoForm.get('countryOfOrigin')?.value;
    const selectedStateId = this.editCoForm.get('stateOfOrigin')?.value;
    if (!selectedCountryId || !selectedStateId || this.dataCountriesOfOrigin.filter(r => r.countryOfOrigin == selectedCountryId
      && r.stateOfOrigin == selectedStateId).length === 0){
        this.showUniqueRecordError = false;
      } else {
        this.showUniqueRecordError = true;
      }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editCoForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editCoForm.controls;
  }

  validatePercentageSum(): void {
    this.showPercentageSumError = false;
    if (this.editCoForm.get('percentageImports')?.errors?.errorMessageFormat){
      return;
    }
    const percentage = this.editCoForm.get('percentageImports')?.value.trim();
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
