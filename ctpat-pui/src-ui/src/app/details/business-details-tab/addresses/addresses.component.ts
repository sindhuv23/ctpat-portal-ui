import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';

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

  private dataAdressList: any[] = [];
  public dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['type', 'addressLine1', 'addressLine2', 'city', 'state', 'postalCode', 'country', 'mailAddrIndicator', 'primaryIndicator', 'entryId'];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id){
        this.accountService.getAccountDetails(id).subscribe((data: any) => {
          if (data){
            this.dataAdressList = [];
            this.dataAdressList.push({type: data.typeName, addressLine1: data.street1, addressLine2: data.street2, 
            city: data.city, state: data.state,
            postalCode: data.postalCode, country: data.country, mailAddrIndicator: 'Y', primaryIndicator: data.isPrimaryAddress});
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

  ngAfterViewInit(): void{
   
  }

  stopSpinner(): void{
    this.accountService.broadcastDetailLoadingStatus(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
