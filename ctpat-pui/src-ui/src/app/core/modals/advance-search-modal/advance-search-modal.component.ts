import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-advance-search-modal',
  templateUrl: './advance-search-modal.component.html',
  styleUrls: ['./advance-search-modal.component.scss']
})
export class AdvanceSearchModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdvanceSearchModalComponent>, private formBuilder: FormBuilder) { }

  public advanceSearchForm!: FormGroup;
  public ctpatStatusArray!: any[];
  public assignedOfficeArray!: any[];
  public subStatusArray!: any[];
  public businessTypeArray!: any[];
  public securityProfileReviewStatusArray!: any[];
  public businessEntityIdTypeArray!: any[];
  public harmonizationStatusArray!: any[];
  public countryOfPrimaryAddressArray!: any[];
  public vettingStatusArray!: any[];




  ngOnInit(): void {

    this.advanceSearchForm = this.formBuilder.group({
      companyName: new FormControl(''),
      ctpatStatus: new FormControl(''),
      assignedOffice: new FormControl(''),
      ctpatAccount: new FormControl(''),
      subStatus: new FormControl(''),
      assignedScss: new FormControl(''),

      businessType: new FormControl(''),
      securityProfileReviewStatus: new FormControl(''),
      supervisor: new FormControl(''),

      businessEntityIdType: new FormControl(''),
      harmonizationStatus: new FormControl(''),
      countryOfPrimaryAddress: new FormControl(''),

      businessEntityIdValue: new FormControl(''),
      vettingStatus: new FormControl(''),
      seaarchPip: new FormControl(''),

      tradeEmail: new FormControl(''),
    });
    this.ctpatStatusArray=[];
    this.assignedOfficeArray=[];
    this.subStatusArray = [];
    this.businessTypeArray = [];
    this.securityProfileReviewStatusArray = [];
    this.businessEntityIdTypeArray = [];
    this.harmonizationStatusArray = [];
    this.countryOfPrimaryAddressArray = [];
    this.vettingStatusArray = [];
  }

  clear(): void {
    this.ngOnInit();
  }

  search(): void {
    this.dialogRef.close();
  }

}