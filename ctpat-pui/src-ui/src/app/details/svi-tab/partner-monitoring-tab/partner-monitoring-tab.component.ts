import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SviSendRequestToPartnerModalComponent } from 'src/app/core/modals/svi-send-request-to-partner-modal/svi-send-request-to-partner-modal.component';
import { SviCertificationEmailDetailsModalComponent } from 'src/app/core/modals/svi-certification-email-details-modal/svi-certification-email-details-modal.component';

@Component({
  selector: 'app-partner-monitoring-tab',
  templateUrl: './partner-monitoring-tab.component.html',
  styleUrls: ['./partner-monitoring-tab.component.scss']
})
export class PartnerMonitoringTabComponent implements OnInit, AfterViewInit {

  public patrnerForm!: FormGroup;
  displayedColumns: string[] = ['companyName', 'businessType', 'accountStatus', 'requestStatus', 'requestDate', 'action'];
  private requestsData: any[] = [];
  public requests = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {

    this.patrnerForm = this.formBuilder.group({
      requestType: new FormControl(''),
      textInput: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  sendRequest() {
    const dialogRef = this.dialog.open(SviSendRequestToPartnerModalComponent, {
      data: {},
      width: '700px',
      height: '400px',
      disableClose: true
    });
  }

  openEmailDetails(record: any) {
    const dialogRef = this.dialog.open(SviCertificationEmailDetailsModalComponent, {
      data: {record},
      width: '600px',
      height: '400px',
      disableClose: true
    });
  }

  doFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    const filterString = JSON.stringify({
      textInput: filterValue
    });
    this.requests.filter = filterString;
  }

  ngAfterViewInit(): void {
    this.requestsData.push({
      companyName: 'Green Testing Inc', businessType: 'Importer', accountStatus: 'Certified', requestStatus: 'Sent',
      requestDate: new Date('06-02-2022'), action: 'action'
    },{
      companyName: 'Blue Importer Inc', businessType: 'Importer', accountStatus: 'Certified', requestStatus: 'Sent',
      requestDate: new Date('09-02-2022'), action: 'action'
    });

    this.requests = new MatTableDataSource<any>(this.requestsData);
    this.requests.paginator = this.paginator;
    this.requests.sort = this.matSort;
    this.addFilterPredicate();
  }

  addFilterPredicate(): void {
    this.requests.filterPredicate = (dataRecord: any, filterString: any): boolean => {
      const filterObject = JSON.parse(filterString);
      return dataRecord.companyName.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.businessType.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.accountStatus.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.requestStatus.toLowerCase().includes(filterObject.textInput) ||
        dataRecord.requestDate.toString().toLowerCase().includes(filterObject.textInput) ||
        dataRecord.action.toLowerCase().includes(filterObject.textInput);
    };
  }

}
