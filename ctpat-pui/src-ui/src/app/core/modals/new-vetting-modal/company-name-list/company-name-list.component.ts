import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddCompanyModalComponent } from '../../add-company-modal/add-company-modal.component';

@Component({
  selector: 'app-company-name-list',
  templateUrl: './company-name-list.component.html',
  styleUrls: ['./company-name-list.component.scss']
})
export class CompanyNameListComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  displayedColumnsCompanyNameList: string[] = ['companyName', 'doingBusinessAs', 'businessPhone', 'businessFax',
   'ownershipType', 'yearsInBusiness', 'numberOfEmployess', 'businessWebsiteAddress', 'entryId'];
   public dataCompanyNameList: any[] = [];
  public dataSourceCompanyNameList = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataCompanyNameList.push({companyName: 'Apples Ltd', doingBusinessAs: '', businessPhone: '123-456-7890', businessFax: '123-456-7891',
    ownershipType: 'Corporate', yearsInBusiness: '12', numberOfEmployess: '22', businessWebsiteAddress: 'www.applesltd.com', entryId: 0});
    this.dataCompanyNameList.push({companyName: 'Apples and Oranges Ltd', doingBusinessAs: '', businessPhone: '999-999-0000', businessFax: '',
    ownershipType: 'Partenership', yearsInBusiness: '15', numberOfEmployess: '', businessWebsiteAddress: '', entryId: 1});
    this.dataSourceCompanyNameList = new MatTableDataSource<any>(this.dataCompanyNameList);
  }


  addNewCompanyName(): void{
    console.log('open add company name modal'); 
    const confirmRef = this.dialog.open(AddCompanyModalComponent, {
      disableClose: true,
      width: '820px',
      height: '360px',
      data: {}
    });
    confirmRef.afterClosed().subscribe(newRecord => {
      if (newRecord) {
        console.log(newRecord);
        this.dataCompanyNameList.push(newRecord);
        this.dataSourceCompanyNameList.data = this.dataCompanyNameList;
      }
    });
  }

  confirmDeletion(index: any): void{
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
        this.deleteCompanyNameListEntry(index);
      }
    });
  }

  deleteCompanyNameListEntry(index: any): void{
    this.dataCompanyNameList.splice(index, 1);
    this.dataSourceCompanyNameList.data = this.dataCompanyNameList;
  }

  // open edit company name modal
  editCompanyNameEntry(row: any, index: number): void{
    console.log('edit row ' + row);
    const confirmRef = this.dialog.open(AddCompanyModalComponent, {
      disableClose: true,
      width: '820px',
      height: '360px',
      data: {companyInfo: row}
    });
    confirmRef.afterClosed().subscribe(updatedRecord => {
      if (updatedRecord) {
        console.log(updatedRecord);
        this.dataCompanyNameList[index] = updatedRecord;
        this.dataSourceCompanyNameList.data = this.dataCompanyNameList;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
