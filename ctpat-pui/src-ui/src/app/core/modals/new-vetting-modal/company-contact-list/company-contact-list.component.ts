import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddCompanyContactModalComponent } from '../../add-company-contact-modal/add-company-contact-modal.component';

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
  public dataCompanyContactList: any[] = []; // for communication with backend
  private dataCompanyContactListDisplay: any[] = []; // for frontend display only
  public dataSourceCompanyContactList = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataCompanyContactList.push({showDocDetail: false, firstName: 'Garbriel', lastName: 'Wesserman', middleNameInitial: '',
    dateOfBirth: new Date(), ssn: '123-45-6789', sin: '222-333-444', rfc: 'HEGJ820506M10', curp: 'MAAR79021RLF03',
    email: 'someone@somedomain.com', telephoneNumber: '123-456-7890', id: null,
    docDetail: [{
      passportNum: 'G-1234567', passportIssuanceCountryId: 275, passportCountry: 'Mexico', birthCountryId: 275, countryOfBirthCd: 'MX', citizenshipCountryId: 275, countryOfCitizenshipCd: 'MX', countryOfBirth: 'Mexico', countryOfCitizenship: 'Mexico',
      usVisaType: 'B1', usVisaNum:'V1234567', alienRegNum: 'A-1234567', naturalizationNum: 'N123456', dlnNum: 'DLN-1234, MX', dlnIssuanceCountryId: 275, dlnCountry: 'Mexico', dlnIssuanceStId: 132,  lpr: 'A# 111-222-333', 
      nexus: 'nexus11', centri: '777700575', globalEntry: '987654321'
      }]
    });
    this.dataCompanyContactList.push({showDocDetail: false, firstName: 'Robert', lastName: 'SomeLastName', middleNameInitial: 'M',
    dateOfBirth:  new Date(), ssn: 'US- 222-45', sin: '555-666-777', rfc: 'HEGJ820506M10', curp: 'MAAR79021RLF03', email: 'test2@somedomain.com', telephoneNumber: '222-456-7890', id: null,
    docDetail: [{
      passportNum: 'J-2224567',  passportIssuanceCountryId: 275, passportCountry: 'Canada', birthCountryId: 275, countryOfBirthCd: 'CA',  citizenshipCountryId: 275, countryOfCitizenshipCd: 'CA',  countryOfBirth: 'Canada', countryOfCitizenship: 'Canada',
      usVisaType: 'B2', usVisaNum:'V2224567', alienRegNum: 'A-222567', naturalizationNum: 'N222456', dlnNum: 'DLN-2221, CA',  dlnIssuanceCountryId: 275, dlnCountry: 'Canada', dlnIssuanceStId: 133, lpr: 'A# 123-456-789',
      nexus: 'nexus12', centri: '777700575', globalEntry: '987654321'
      }]
    });

    this.processNestedTableDataForDisplay();
  }

  getData() : any[]{
    const list: any[] = [];
    this.dataCompanyContactList.forEach(contact =>{
      const docDetail ={...contact.docDetail[0]}
      const ct = {...contact, ...docDetail};
      delete ct.docDetail;
      list.push(ct);
    });
    return list;
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
    const confirmRef = this.dialog.open(AddCompanyContactModalComponent, {
      disableClose: true,
      width: '950px',
      height: '700px',
      data: {}
    });
    confirmRef.afterClosed().subscribe(newRecord => {
      if (newRecord) {
        console.log(newRecord);
        this.dataCompanyContactList.push(newRecord);
        this.dataSourceCompanyContactList.data = this.dataCompanyContactList;
      }
    });
  }

  confirmDeletion(index: number): void{
    const confirmRef = this.dialog.open(ConfirmationDialogModalComponent, {
      disableClose: true,
      width: '460px',
      height: '200px',
      data: {
        title: 'Please Confirm Delete Action',
        message: 'This record will be deleted and cannot be recovered. \nContinue to delete?'
      }
    });
    confirmRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCompanyContactListEntry(index);
      }
    });
  }

  deleteCompanyContactListEntry(index: number): void{
    console.log('delete row index' , index);
    this.dataCompanyContactList.splice(index, 1);

    this.processNestedTableDataForDisplay();
  }

  // open edit company name modal
  editCompanyContactEntry(index: number): void{
    console.log('edit row index' , index);
    const confirmRef = this.dialog.open(AddCompanyContactModalComponent, {
      disableClose: true,
      width: '950px',
      height: '700px',
      data: {row: this.dataCompanyContactList[index]}
    });
    confirmRef.afterClosed().subscribe(updatedRecord => {
      if (updatedRecord) {
        console.log(updatedRecord);
        this.dataCompanyContactList[index] = updatedRecord;
        this.dataSourceCompanyContactList.data = this.dataCompanyContactList;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
