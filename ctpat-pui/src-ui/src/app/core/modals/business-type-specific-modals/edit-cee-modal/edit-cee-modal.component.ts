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
  selector: 'app-edit-cee-modal',
  templateUrl: './edit-cee-modal.component.html',
  styleUrls: ['./edit-cee-modal.component.scss']
})
export class EditCeeModalComponent implements OnInit, OnDestroy {

  public editCeeForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  public esCenterList: any;
  public checkboxDataList: any;
  public selectedCommodities: any;
  public ctpatAccountId = '';

  constructor(public dialogRef: MatDialogRef<EditCeeModalComponent>, private referenceService: ReferenceService,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
              private accountService: AccountService, private beiTabService: BeiTabService, private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.ctpatAccountId = this.data.ctpatAccountId;

    this.esCenterList = this.referenceService.getEsCenterList();
    this.esCenterList = this.esCenterList.filter((r: any) => r.centerId.includes('CEE'));
    this.checkboxDataList = JSON.parse(JSON.stringify(this.esCenterList))
      .sort((r1: any, r2: any) => r1.descriptionText.localeCompare(r2.descriptionText));

    this.editCeeForm = this.formBuilder.group({
      approvedIndicator: new FormControl(),
      cee: new FormControl('', Validators.required),
      // checkboxes
      commodities: new FormArray([])
    });

    this.addCheckboxesToForm();
    this.populateFields();
  }

  populateFields(): void{
    for (const record of this.data.ceeData){
        if (record.importer_cee_code === 'cee_approved'){
          if (record.importer_cee_values){
            this.editCeeForm.get('approvedIndicator')?.setValue(record.importer_cee_values);
          }
        } else if (record.importer_cee_code === 'cee_center'){
          if (record.importer_cee_values){
            this.editCeeForm.get('cee')?.setValue(record.importer_cee_values);
          }
        } else if (record.importer_cee_code === 'cee_commodities'){
          if (record.importer_cee_values){
            const index = this.checkboxDataList.findIndex((r: any) => r.centerId === record.importer_cee_values);
            this.commodityArray.get(index.toString())?.setValue(true);
          }
        }
      }
    }

  addCheckboxesToForm(): void{
    this.checkboxDataList.forEach((element: any) => {
      this.commodityArray.push(new FormControl(false));
    });
  }

  get commodityArray(): FormArray {
    return this.editCeeForm.controls.commodities as FormArray;
  }

  save(): void{
    this.submitted = true;
    this.populateCommodities();
    if (this.editCeeForm.invalid || !this.isAnyCommoditySelected()){
      return;
    }

    const rawValues = this.editCeeForm.getRawValue();

    const ceeData = {approvedIndicator: rawValues.approvedIndicator,
    cee: rawValues.cee, commodities: JSON.stringify(this.selectedCommodities),
    ctpatAccountId: this.ctpatAccountId};

    this.subscriptions.add(this.beiTabService.saveCee(ceeData)
    .subscribe((data: any) => {
      this.accountService.broadcastAccountId(parseInt(this.ctpatAccountId, 10));
      this.detailsService.broadcastCurrentTabIndex(1);
      this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.dialogRef.close();
      }));
  }

  populateCommodities(): void {
    this.selectedCommodities = this.editCeeForm.value.commodities
      .map((checked: any, i: number) => checked ? this.checkboxDataList[i].centerId : null)
      .filter((c: any) => c);
  }

  isAnyCommoditySelected(): boolean {
    return this.selectedCommodities.length !== 0;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editCeeForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editCeeForm.controls;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
