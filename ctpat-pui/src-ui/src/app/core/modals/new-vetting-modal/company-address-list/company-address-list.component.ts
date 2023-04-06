import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { CreateAddressModalComponent } from '../../create-address-modal/create-address-modal.component';

@Component({
  selector: 'app-company-address-list',
  templateUrl: './company-address-list.component.html',
  styleUrls: ['./company-address-list.component.scss']
})
export class CompanyAddressListComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  displayedColumnsCompanyAddressList: string[] = ['type', 'street1', 'street2', 'city', 'state', 'postalCode', 'country', 'id'];

  private dataCompanyAddressList: any[] = [];
  public dataSourceCompanyAddressList = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataCompanyAddressList.push({type: 'Main Office', street1: '22 Some Road', street2: 'Suite 101',
    city: 'Some City', state: 'Some State',  postalCode: '12345', country: 'France', id: 0});
    this.dataCompanyAddressList.push({type: 'Associate', street1: 'Some Steet Name', street2: 'Number 202',
    city: 'Alexandria', state: 'VA', postalCode: '22222', country: 'US', id: 1});
    this.dataSourceCompanyAddressList = new MatTableDataSource<any>(this.dataCompanyAddressList);
  }

  addAddress(): void{
    console.log('open add address modal');
    const dialogRef = this.dialog.open(CreateAddressModalComponent, {
      data: {  },
      width: '800px',
      height: '380px',
      disableClose: true
    });
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
     this.dataCompanyAddressList[i].id = i;
    }
    this.dataSourceCompanyAddressList = new MatTableDataSource<any>(this.dataCompanyAddressList);
  }

  // open edit company name modal
  editCompanyAddressEntry(row: any): void{
    console.log('edit row ' + row);
    const dialogRef = this.dialog.open(CreateAddressModalComponent, {
      data: { address: row},
      width: '800px',
      height: '380px',
      disableClose: true
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
