import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-svi-send-request-to-partner-modal',
  templateUrl: './svi-send-request-to-partner-modal.component.html',
  styleUrls: ['./svi-send-request-to-partner-modal.component.scss']
})
export class SviSendRequestToPartnerModalComponent implements OnInit, AfterViewInit {

  public patrnerForm!: FormGroup;
  displayedColumns: string[] = ['select', 'companyName', 'businessType', 'accountStatus', 'requestStatus', 'requestDate'];
  private requestsData: any[] = [];
  public requestDataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<SviSendRequestToPartnerModalComponent>) {

    this.patrnerForm = this.formBuilder.group({
      requestType: new FormControl(''),
      textInput: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.requestDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.requestDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  doFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    const filterString = JSON.stringify({
      textInput: filterValue
    });
    this.requestDataSource.filter = filterString;
  }

  ngAfterViewInit(): void {
    this.requestsData.push({
      position: 1, companyName: 'Yellow testing Inc', businessType: 'Importer', accountStatus: 'Certified', requestStatus: 'Sent',
      requestDate: new Date('06-02-2022 15:33')
    }, {
      position: 2, companyName: 'Yellow LTD', businessType: 'Importer', accountStatus: 'Certified', requestStatus: '',
      requestDate: ''
    }, {
      position: 3, companyName: 'Test Inc', businessType: 'All Carrier', accountStatus: 'Certified', requestStatus: '',
      requestDate: ''
    });

    this.requestDataSource = new MatTableDataSource<any>(this.requestsData);
    this.requestDataSource.paginator = this.paginator;
    this.requestDataSource.sort = this.matSort;
    this.addFilterPredicate();
  }

  addFilterPredicate(): void {
    this.requestDataSource.filterPredicate = (dataRecord: any, filterString: any): boolean => {
      const filterObject = JSON.parse(filterString);
      return dataRecord.companyName.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.businessType.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.accountStatus.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.requestStatus.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.requestDate.toString().toLowerCase().includes(filterObject.textInput);
    };
  }

  search() {

  }
  
  sendRequest() {
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
