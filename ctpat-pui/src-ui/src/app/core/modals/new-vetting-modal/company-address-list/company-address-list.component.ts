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

  public dataCompanyAddressList: any[] = [];
  public dataSourceCompanyAddressList = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataCompanyAddressList.push({type: 'Main Office', street1: '22 Some Road', street2: 'Suite 101',
    city: 'Some City', stateId: 132,  postalCode: '12345', countryId: 275, id: null});
    this.dataCompanyAddressList.push({type: 'Associate', street1: 'Some Steet Name', street2: 'Number 202',
    city: 'Alexandria', stateId: 133, postalCode: '22222', countryId: 275, id: null});
    this.dataSourceCompanyAddressList = new MatTableDataSource<any>(this.dataCompanyAddressList);
  }

  addAddress(): void{
    console.log('open add address modal');
    const dialogRef = this.dialog.open(CreateAddressModalComponent, {
      data: { parent: 'Vetting' },
      width: '800px',
      height: '380px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(newRecord => {
      if (newRecord && Object.keys(newRecord).length > 0 && Object.getPrototypeOf(newRecord) === Object.prototype) {
        console.log(newRecord);
        this.dataCompanyAddressList.push(newRecord);
        this.dataSourceCompanyAddressList.data = this.dataCompanyAddressList;
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
        this.deleteCompanyAddressListEntry(index);
      }
    });
  }

  deleteCompanyAddressListEntry(index: number): void{
    this.dataCompanyAddressList.splice(index, 1);
    this.dataSourceCompanyAddressList.data = this.dataCompanyAddressList;
  }

  // open edit company name modal
  editCompanyAddressEntry(row: any, index: number): void{
    console.log('edit row ' + row);
    const address = {...row, parent: 'Vetting'}
    const dialogRef = this.dialog.open(CreateAddressModalComponent, {
      data: { address },
      width: '800px',
      height: '380px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(updatedRecord => {
      if (updatedRecord && Object.keys(updatedRecord).length > 0  && Object.getPrototypeOf(updatedRecord) === Object.prototype) {
        console.log(updatedRecord);
        this.dataCompanyAddressList[index] = updatedRecord;
        this.dataSourceCompanyAddressList.data = this.dataCompanyAddressList;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}