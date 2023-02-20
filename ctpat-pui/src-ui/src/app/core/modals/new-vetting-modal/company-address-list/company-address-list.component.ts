import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-company-address-list',
  templateUrl: './company-address-list.component.html',
  styleUrls: ['./company-address-list.component.scss']
})
export class CompanyAddressListComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  displayedColumnsCompanyAddressList: string[] = ['type', 'addressLine1', 'addressLine2', 'city', 'state', 'postalCode', 'country', 'entryId'];

  private dataCompanyAddressList: any[] = [];
  public dataSourceCompanyAddressList = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataCompanyAddressList.push({type: 'Main Office', addressLine1: '22 Some Road', addressLine2: 'Suite 101',
    city: 'Some City', state: 'Some State',  postalCode: '12345', country: 'France', entryId: 0});
    this.dataCompanyAddressList.push({type: 'Associate', addressLine1: 'Some Steet Name', addressLine2: 'Number 202',
    city: 'Alexandria', state: 'VA', postalCode: '22222', country: 'US', entryId: 1});
    this.dataSourceCompanyAddressList = new MatTableDataSource<any>(this.dataCompanyAddressList);
  }

  addAddress(): void{
    console.log('open add address modal');
  }

  confirmDeletion(id: any): void{
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
        this.deleteCompanyAddressListEntry(id);
      }
    });
  }

  deleteCompanyAddressListEntry(id: any): void{
    this.dataCompanyAddressList.splice(id, 1);
    for (let i = 0; i < this.dataCompanyAddressList.length; i++) {
     this.dataCompanyAddressList[i].entryId = i;
    }
    this.dataSourceCompanyAddressList = new MatTableDataSource<any>(this.dataCompanyAddressList);
  }

  // open edit company name modal
  editCompanyAddressEntry(id: any): void{
    console.log('edit ID ' + id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
