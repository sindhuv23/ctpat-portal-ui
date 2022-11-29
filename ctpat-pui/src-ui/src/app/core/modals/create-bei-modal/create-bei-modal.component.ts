import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-create-bei-modal',
  templateUrl: './create-bei-modal.component.html',
  styleUrls: ['./create-bei-modal.component.scss']
})
export class CreateBeiModalComponent implements OnInit,  OnDestroy, AfterViewInit {

  public createBeiForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  displayedColumnsBeiRecords: string[] = ['beiType', 'beiValue', 'entryId'];
  displayedColumnsCountriesOfOrigin: string[] = ['percentageImports', 'countryOfOrigin', 'stateOfOrigin', 'cityOfOrigin', 'entryId'];
  private dataBeiRecords: any[] = [];
  private dataCountriesOfOrigin: any[] = [];
  public dataSourceBeiRecords = new MatTableDataSource<any>();
  public dataSourceCountriesOfOrigin = new MatTableDataSource<any>();

  constructor(public dialogRef: MatDialogRef<CreateBeiModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.createBeiForm = this.formBuilder.group({
      beiType: new FormControl(''),
      beiValue: new FormControl(''),
      approvedCee: new FormControl(''),
      currentCenter: new FormControl(''),
      percentageImports: new FormControl(''),
      countryOfOrigin: new FormControl(''),
      stateOfOrigin: new FormControl({value: '', disabled: true}),
      cityOfOrigin: new FormControl({value: '', disabled: true}),
       // checkboxes
       agricultureIndicator: new FormControl(false),
       apparelIndicator: new FormControl(false),
       automotiveIndicator: new FormControl(false),
       metalIndicator: new FormControl(false),
       consumerProductIndicator: new FormControl(false),
       electronicsIndicator: new FormControl(false),
       materialsIndicator: new FormControl(false),
       machineryIndicator: new FormControl(false),
       petroleumIndicator: new FormControl(false),
       chemicalsIndicator: new FormControl(false)
    });
  }

  ngAfterViewInit(): void{
  }

  addNewBeiRecord(): void{
    const formRawValue = this.createBeiForm.getRawValue();
    if (formRawValue.beiType && formRawValue.beiValue){
      this.dataBeiRecords.push({beiType: formRawValue.beiType, beiValue: formRawValue.beiValue, entryId: this.dataBeiRecords.length});
      this.dataSourceBeiRecords = new MatTableDataSource<any>(this.dataBeiRecords);
    }
  }

  addCountryOfOrigin(): void{
    if (this.dataCountriesOfOrigin.length >= 5){
      return;
    }
    const formRawValue = this.createBeiForm.getRawValue();
    if (formRawValue.percentageImports && formRawValue.countryOfOrigin){
      this.dataCountriesOfOrigin.push({percentageImports: formRawValue.percentageImports, countryOfOrigin: formRawValue.countryOfOrigin,
        stateOfOrigin: formRawValue.stateOfOrigin, cityOfOrigin: formRawValue.cityOfOrigin, entryId: this.dataBeiRecords.length});
      this.dataSourceCountriesOfOrigin = new MatTableDataSource<any>(this.dataCountriesOfOrigin);
    }
  }

  deleteBeiRecordEntry(id: any): void{
    this.dataBeiRecords.splice(id, 1);
    for (let i = 0; i < this.dataBeiRecords.length; i++) {
     this.dataBeiRecords[i].entryId = i;
    }
    this.dataSourceBeiRecords = new MatTableDataSource<any>(this.dataBeiRecords);
  }

  deleteCountryOfOriginEntry(id: any): void{
    this.dataCountriesOfOrigin.splice(id, 1);
    for (let i = 0; i < this.dataCountriesOfOrigin.length; i++) {
     this.dataCountriesOfOrigin[i].entryId = i;
    }
    this.dataSourceCountriesOfOrigin = new MatTableDataSource<any>(this.dataCountriesOfOrigin);
  }

  countrySelected(event: any): void {
    if (event){
      this.createBeiForm.get('stateOfOrigin')?.enable();
    } else {
      this.createBeiForm.get('stateOfOrigin')?.disable();
      this.createBeiForm.get('stateOfOrigin')?.setValue(null);
      this.createBeiForm.get('cityOfOrigin')?.disable();
      this.createBeiForm.get('cityOfOrigin')?.setValue(null);
    }
  }

  stateSelected(event: any): void {
    if (event){
      this.createBeiForm.get('cityOfOrigin')?.enable();
    } else {
      this.createBeiForm.get('cityOfOrigin')?.disable();
      this.createBeiForm.get('cityOfOrigin')?.setValue(null);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.createBeiForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.createBeiForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.createBeiForm.invalid){
      return;
    }

    console.log('other validations then save');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  clear(): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
