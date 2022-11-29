import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-company-contact-list',
  templateUrl: './company-contact-list.component.html',
  styleUrls: ['./company-contact-list.component.scss'],
  animations: [
    trigger('docDetailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyContactListComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  displayedColumnsCompanyContactList: string[] = ['showDocDetail', 'firstName', 'lastName', 'middleInitial',
    'dateOfBirth', 'idNumbers', 'email', 'phone', 'entryId'];
  displayedColumnsCompanyDocDetail: string[] = ['passportInfo', 'countryOfBirth', 'countryOfCitizenship', 'visaInfo', 'alienNum',
    'naturalizationNum', 'dlnInfo', 'lpr', 'nexus'];
  private dataCompanyContactList: any[] = []; // for communication with backend
  private dataCompanyContactListDisplay: any[] = []; // for frontend display only
  public dataSourceCompanyContactList = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataCompanyContactList.push({showDocDetail: false, firstName: 'Garbriel', lastName: 'Wesserman', middleInitial: '',
    dateOfBirth: '01/01/1950', idNumbers: 'SSN- 123-45-6789\nSIN- 222-333-444\nCURP- MAAR790213HMNRLF03\nRFC- HEGJ820506M10',
    email: 'someone@somedomain.com', phone: '123-456-7890', entryId: 0,
    docDetail: [{
      passportInfo: 'G-1234567, MX', passportCountry: 'Mexico', countryOfBirthCd: 'MX', countryOfCitizenshipCd: 'MX', countryOfBirth: 'Mexico', countryOfCitizenship: 'Mexico',
      visaInfo: 'B1,V1234567', alienNum: 'A-1234567', naturalizationNum: 'N123456', dlnInfo: 'DLN-1234, MX', dlnCountry: 'Mexico', lpr: 'A# 111-222-333', nexus: 'nexus11'
      }]
    });
    this.dataCompanyContactList.push({showDocDetail: false, firstName: 'Robert', lastName: 'SomeLastName', middleInitial: 'M',
    dateOfBirth: '03/01/1990', idNumbers: 'US- 222-45-6789', email: 'test2@somedomain.com', phone: '222-456-7890', entryId: 1,
    docDetail: [{
      passportInfo: 'J-2224567, CA',  passportCountry: 'Canada', countryOfBirthCd: 'CA', countryOfCitizenshipCd: 'CA',  countryOfBirth: 'Canada', countryOfCitizenship: 'Canada',
      visaInfo: 'B2, V2224567', alienNum: 'A-222567', naturalizationNum: 'N222456', dlnInfo: 'DLN-2221, CA',  dlnCountry: 'Canada', lpr: 'A# 123-456-789',
      nexus: 'NEXUS- 123456789S123C\nCENTRI- 777700575\nGlobal Entry- 987654321'
      }]
    });

    this.processNestedTableDataForDisplay();
  }

  processNestedTableDataForDisplay(): void{
    this.dataCompanyContactListDisplay = [];
    this.dataCompanyContactList.forEach(
      record => {
        if (record.docDetail && Array.isArray(record.docDetail) && record.docDetail.length){
          this.dataCompanyContactListDisplay = [...this.dataCompanyContactListDisplay,
          {...record, docDetail: new MatTableDataSource<any>(record.docDetail)}];
        } else {
          this.dataCompanyContactListDisplay = [...this.dataCompanyContactListDisplay, record];
        }
    });

    this.dataSourceCompanyContactList = new MatTableDataSource<any>(this.dataCompanyContactListDisplay);
  }

  toggleRow(row: any): void {
    const rowClicked = this.dataSourceCompanyContactList.data.find(elem => elem !== undefined && elem.entryId === row.entryId);
    const index = this.dataSourceCompanyContactList.data.indexOf(rowClicked);
    this.dataSourceCompanyContactList.data[index].showDocDetail = !this.dataSourceCompanyContactList.data[index].showDocDetail;
    this.dataCompanyContactList[index].showDocDetail = !this.dataCompanyContactList[index].showDocDetail;
  }

  addContact(): void{
    console.log('open add contact modal');
  }

  confirmDeletion(id: any): void{
    const confirmRef = this.dialog.open(ConfirmationDialogModalComponent, {
      disableClose: true,
      width: '460px',
      data: {
        title: 'Please Confirm Delete Action',
        message: 'This record will be deleted and cannot be recovered. \nContinue to delete?'
      }
    });
    confirmRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCompanyContactListEntry(id);
      }
    });
  }

  deleteCompanyContactListEntry(id: any): void{
    this.dataCompanyContactList.splice(id, 1);
    for (let i = 0; i < this.dataCompanyContactList.length; i++) {
     this.dataCompanyContactList[i].entryId = i;
    }

    this.processNestedTableDataForDisplay();
  }

  // open edit company name modal
  editCompanyContactEntry(id: any): void{
    console.log('edit ID ' + id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

