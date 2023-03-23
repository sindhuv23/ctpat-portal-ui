import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { CreateAddressModalComponent } from 'src/app/core/modals/create-address-modal/create-address-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { ConfirmSetPrimaryDialogComponent } from '../confirm-set-primary-dialog/confirm-set-primary-dialog.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  private subscriptions = new Subscription();
  public isLoading = false;
  private accountId!: any;

  private dataAdressList: any[] = [];
  public dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['typeName', 'street1', 'street2', 'city', 'state', 'postalCode', 'country', 'isMailingAddress', 'isPrimaryAddress', 'entryId'];

  constructor(private accountService: AccountService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id) {
        this.accountId = id;
        this.accountService.getAccountDetails(id).subscribe((data: any) => {
          if (data) {
            this.dataAdressList = [];
            if (data.accountAddresses) {
              this.dataAdressList.push(...data.accountAddresses);
            }
            this.dataSource = new MatTableDataSource<any>(this.dataAdressList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.matSort;
          }
          this.stopSpinner();
        }, error => {
          this.stopSpinner();
        });
      }
    }));
  }

  ngAfterViewInit(): void {

  }

  stopSpinner(): void {
    this.accountService.broadcastDetailLoadingStatus(false);
  }

  addEditAddress(address?: any) {
    address = address ? address : { ctpatAccountId: this.accountId };
    const dialogRef = this.dialog.open(CreateAddressModalComponent, {
      data: { address },
      width: '800px',
      height: '380px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(accountId => {
      console.log('The dialog was closed');
      if (accountId) {
        this.populateAddress(accountId);
      }
    });
  }


  deleteAddress(id: any) {
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
        this.accountService.deleteAccountAddress(id).subscribe(res => {
          console.log("CTPAT Account address deleted");
          this.populateAddress(this.accountId);
        });
      }
    });
  }

  populateAddress(accountId: any) {
    this.accountService.getCtpatAccountAddress(accountId).subscribe((data: any) => {
      if (data) {
        this.dataAdressList = [];
        this.dataAdressList.push(...data);
        this.dataSource = new MatTableDataSource<any>(this.dataAdressList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      }
      this.stopSpinner();
    }, error => {
      this.stopSpinner();
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setPrimaryConfirmDialog(addressId: any) {
    
    const confirmRef = this.dialog.open(ConfirmSetPrimaryDialogComponent, {
      disableClose: true,
      width: '460px',
      height: '200px',
      data: {
        title: 'Confirm Primary Address',
        message: 'Warning, setting this address as primary will remove any previously  designated primary settings. Please select OK to proceed or cancel to exit without changes.'
      }
    });

    confirmRef.afterClosed().subscribe((result) => {
      if(result) {
          //TODO: Make web service call to update DB.
          this.accountService.updateAddressPrimaryInd(this.accountId, addressId).subscribe((result) => {
            this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
              if (id) {
                this.accountId = id;
                this.accountService.getAccountDetails(id).subscribe((data: any) => {
                  if (data) {
                    this.dataAdressList = [];
                    if (data.accountAddresses) {
                      this.dataAdressList.push(...data.accountAddresses);
                    }
        
                    this.dataSource = new MatTableDataSource<any>(this.dataAdressList);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.matSort;
                  }
                  this.stopSpinner();
                }, error => {
                  this.stopSpinner();
                });
              }
            }));
          });
      }
    });
  }
}