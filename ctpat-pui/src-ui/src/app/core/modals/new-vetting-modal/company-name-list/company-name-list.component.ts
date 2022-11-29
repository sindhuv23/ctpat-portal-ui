import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-company-name-list',
  templateUrl: './company-name-list.component.html',
  styleUrls: ['./company-name-list.component.scss']
})
export class CompanyNameListComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  displayedColumnsCompanyNameList: string[] = ['companyName', 'doingBusinessAs', 'businessPhone', 'businessFax',
   'ownershipType', 'yearsInBusiness', 'numberOfEmployess', 'businessWebsiteAddress', 'entryId'];
  private dataCompanyNameList: any[] = [];
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
        this.deleteCompanyNameListEntry(id);
      }
    });
  }

  deleteCompanyNameListEntry(id: any): void{
    this.dataCompanyNameList.splice(id, 1);
    for (let i = 0; i < this.dataCompanyNameList.length; i++) {
     this.dataCompanyNameList[i].entryId = i;
    }
    this.dataSourceCompanyNameList = new MatTableDataSource<any>(this.dataCompanyNameList);
  }

  // open edit company name modal
  editCompanyNameEntry(id: any): void{
    console.log('edit ID ' + id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
