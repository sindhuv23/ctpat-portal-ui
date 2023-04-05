import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { BeiTabService } from 'src/app/core/services/bei-tab.service';
import { DetailsService } from 'src/app/core/services/details.service';
import { ReferenceService } from 'src/app/core/services/reference.service';

@Component({
  selector: 'app-edit-hwy-carrier-modal',
  templateUrl: './edit-hwy-carrier-modal.component.html',
  styleUrls: ['./edit-hwy-carrier-modal.component.scss']
})
export class EditHwyCarrierModalComponent implements OnInit, OnDestroy {

  public editBorderCrossingForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  public borderCrossingListOriginal: any;
  public borderCrossingList: any;
  public servicesOfferedList: any;
  public selectedServicesOffered: any;
  public driverSourcesList: any;
  public selectedDriverSources: any;
  public ctpatAccountId = '';
  public borderCrossedOriginal = '';

  constructor(public dialogRef: MatDialogRef<EditHwyCarrierModalComponent>, private referenceService: ReferenceService,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
              private accountService: AccountService, private beiTabService: BeiTabService, private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.ctpatAccountId = this.data.ctpatAccountId;

    this.borderCrossingListOriginal = this.referenceService.getBorderCrossingList()
    .sort((r1: any, r2: any) => r1.border_crossing_description.localeCompare(r2.border_crossing_description));

    this.servicesOfferedList = this.referenceService.getServiceOfferedList()
      .sort((r1: any, r2: any) => r1.service_offered_description.localeCompare(r2.service_offered_description));

    this.driverSourcesList = this.referenceService.getDriverSourceList()
      .sort((r1: any, r2: any) => r1.driver_source_description.localeCompare(r2.driver_source_description));

    this.editBorderCrossingForm = this.formBuilder.group({
      borderCrossed: new FormControl('', Validators.required),
      numBorderCrossings: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]),
      borderCrossings: new FormControl('', Validators.required),
      // checkboxes
      servicesOffered: new FormArray([]),
      driverSources: new FormArray([])
    });

    this.editBorderCrossingForm.get('borderCrossings')?.disable();
    this.addCheckboxesToForm();
    this.populateFields();
  }

  populateFields(): void{
    let crossingArray = [];
    for (const record of this.data.hwyCarrierData){
        if (record.key === 'hwc_borderscrossed'){
          if (record.value){
            this.editBorderCrossingForm.get('borderCrossed')?.setValue(record.value);
            this.editBorderCrossingForm.get('borderCrossings')?.enable();
            this.borderCrossedSelected(record.value);
            this.borderCrossedOriginal = record.value;
          }
        } else if (record.key === 'hwc_borderscrossed_number'){
          if (record.value){
            this.editBorderCrossingForm.get('numBorderCrossings')?.setValue(record.value);
          }
        } else if (record.key === 'hwc_services_offered'){
          if (record.value){
            const index = this.servicesOfferedList.findIndex((r: any) => r.id === record.value);
            this.servicesOfferedArray.get(index.toString())?.setValue(true);
          }
        } else if (record.key === 'hwc_driver_sources'){
          if (record.value){
            const index = this.driverSourcesList.findIndex((r: any) => r.id === record.value);
            this.driverSourcesArray.get(index.toString())?.setValue(true);
          }
        } else if (record.key === 'hwc_borderscrossing_locations'){
          if (record.value){
            crossingArray.push(record.value);
          }
        }
      }
    this.editBorderCrossingForm.get('borderCrossings')?.setValue(crossingArray);
    }

  addCheckboxesToForm(): void{
    this.servicesOfferedList.forEach((element: any) => {
      this.servicesOfferedArray.push(new FormControl(false));
    });

    this.driverSourcesList.forEach((element: any) => {
      this.driverSourcesArray.push(new FormControl(false));
    });
  }

  get servicesOfferedArray(): FormArray {
    return this.editBorderCrossingForm.controls.servicesOffered as FormArray;
  }

  get driverSourcesArray(): FormArray {
    return this.editBorderCrossingForm.controls.driverSources as FormArray;
  }

  save(): void{
    this.submitted = true;
    this.populateServicesOffered();
    this.populateDriverSources();
    if (this.editBorderCrossingForm.invalid || !this.isAnyServicesOfferedSelected()
      || !this.isAnyDriverSourcesSelected()){
      return;
    }

    const rawValues = this.editBorderCrossingForm.getRawValue();

    const hwyCarrierData = {borderCrossed: rawValues.borderCrossed, numBorderCrossings: rawValues.numBorderCrossings,
    borderCrossings: JSON.stringify(rawValues.borderCrossings), servicesOffered: JSON.stringify(this.selectedServicesOffered),
    driverSources: JSON.stringify(this.selectedDriverSources), ctpatAccountId: this.ctpatAccountId};

    if (this.borderCrossedOriginal !== rawValues.borderCrossed){
      this.beiTabService.updateBusinessType({ctpatAccountId: this.ctpatAccountId, borderCrossed: rawValues.borderCrossed}).subscribe();
    }

    this.subscriptions.add(this.beiTabService.saveHwyCarrier(hwyCarrierData)
    .subscribe((data: any) => {
      this.accountService.broadcastAccountId(parseInt(this.ctpatAccountId, 10));
      this.detailsService.broadcastCurrentTabIndex(1);
      this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.dialogRef.close();
      }));
  }

  populateServicesOffered(): void {
    this.selectedServicesOffered = this.editBorderCrossingForm.value.servicesOffered
      .map((checked: any, i: number) => checked ? this.servicesOfferedList[i].id : null)
      .filter((c: any) => c);
  }

  isAnyServicesOfferedSelected(): boolean {
    return this.selectedServicesOffered.length !== 0;
  }

  populateDriverSources(): void {
    this.selectedDriverSources = this.editBorderCrossingForm.value.driverSources
      .map((checked: any, i: number) => checked ? this.driverSourcesList[i].id : null)
      .filter((c: any) => c);
  }

  isAnyDriverSourcesSelected(): boolean {
    return this.selectedDriverSources.length !== 0;
  }

  borderCrossedSelected(event: any): void {
    if (event){
      this.editBorderCrossingForm.get('borderCrossings')?.enable();
      if (event === 'CAN'){
        this.borderCrossingList = this.borderCrossingListOriginal.filter((r: any) => r.foreign_country_id == 3);
      } else if (event === 'MEX'){
        this.borderCrossingList = this.borderCrossingListOriginal.filter((r: any) => r.foreign_country_id == 2);
      } else if (event === 'BOTH'){
        this.borderCrossingList = this.borderCrossingListOriginal;
      }
    } else {
      this.editBorderCrossingForm.get('borderCrossings')?.disable();
      this.editBorderCrossingForm.get('borderCrossings')?.setValue(null);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editBorderCrossingForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editBorderCrossingForm.controls;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
