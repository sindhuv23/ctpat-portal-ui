import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-associate-mr-records-modal',
  templateUrl: './associate-mr-records-modal.component.html',
  styleUrls: ['./associate-mr-records-modal.component.scss']
})
export class AssociateMrRecordsModalComponent implements OnInit, OnDestroy, AfterViewInit {

  public associateMrRecordsForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  displayedColumns: string[] = ['select', 'accountInfo', 'certificationDate', 'validationDate'];
  private dataMrRecords: any[] = [];
  public dataSourceMrRecords = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumnsSelectedMrRecords: string[] = ['accountInfo', 'certificationDate', 'validationDate', 'entryId'];
  private dataSelectedMrRecords: any[] = [];
  public dataSourceSelectedMrRecords = new MatTableDataSource<any>();

  public selection: any;

  constructor(public dialogRef: MatDialogRef<AssociateMrRecordsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.selection = new SelectionModel<any>(true, []); // allow multiple selections. initialize to []

    this.associateMrRecordsForm = this.formBuilder.group({
      keyword: new FormControl('')
    });
  }

  ngAfterViewInit(): void{
    this.dataMrRecords.push({mrId: '001', select: false, accountInfo: '10770 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '10/03/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '002', select: false, accountInfo: '10809 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 202, 223 10 Avenue, Ontario 3D3C6', certificationDate: '12/03/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '003',  select: false, accountInfo: '10771 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '01/03/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '004',  select: false, accountInfo: '10772 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '02/13/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '005',  select: false, accountInfo: '10773 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '04/22/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '006',  select: false, accountInfo: '10774 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '06/21/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '007',  select: false, accountInfo: '10775 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '10/21/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '008',  select: false, accountInfo: '10776 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '10/06/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '009',  select: false, accountInfo: '10777 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '10/06/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '010',  select: false, accountInfo: '10778 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '11/22/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '011',  select: false, accountInfo: '10779 - Levis Strauss Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 200, 1725 16 Avenue, Richmond Hill 4B4C6', certificationDate: '09/07/2022', validationDate: ''});
    this.dataMrRecords.push({mrId: '012',  select: false, accountInfo: '20893 - Some Co. (Canada) Inc. Canadian Border Service Agency (CSBA) -'
     + 'Suite 333, 345 2nd Street, Somecity LB3C6', certificationDate: '04/15/2022', validationDate: ''});
    this.dataSourceMrRecords = new MatTableDataSource<any>(this.dataMrRecords);
    this.dataSourceMrRecords.paginator = this.paginator;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.associateMrRecordsForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.associateMrRecordsForm.controls;
  }

  associate(): void{
    console.log('validations then associate');
  }

  search(): void{
    console.log('search');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getSelectedRecords(): void {
    this.dataSelectedMrRecords = [];
    this.selection.selected.forEach((element: any) => {
      this.dataSelectedMrRecords.push({accountInfo: element.accountInfo, certificationDate: element.certificationDate,
        validationDate: element.validationDate, entryId: this.dataSelectedMrRecords.length, mrId: element.mrId});
    });

    this.dataSourceSelectedMrRecords = new MatTableDataSource<any>(this.dataSelectedMrRecords);
  }

  deleteSelectedMrRecordEntry(entryId: any, mrId: any): void{
    // delete from selection -> uncheck checkbox (left side)
    this.selection.selected.forEach((element: any) => {
      if (element.mrId === mrId){
        this.selection.deselect(element);
      }
    });

    // delete from selected records (right side)
    this.dataSelectedMrRecords.splice(entryId, 1);
    for (let i = 0; i < this.dataSelectedMrRecords.length; i++) {
     this.dataSelectedMrRecords[i].entryId = i;
    }
    this.dataSourceSelectedMrRecords = new MatTableDataSource<any>(this.dataSelectedMrRecords);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


