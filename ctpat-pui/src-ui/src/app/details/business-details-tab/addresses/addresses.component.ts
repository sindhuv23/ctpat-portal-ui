import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

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

  displayedColumns: string[] = ['type', 'addressLine1', 'addressLine2', 'city', 'state', 'postalCode', 'country', 'mailAddrIndicator', 'primaryIndicator'];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataAdressList.push({type: 'Main Office', addressLine1: '22 Some Road', addressLine2: 'Suite 101', city: 'Some City', state: 'Some State',
                      postalCode: '12345', country: 'France', mailAddrIndicator: 'Y', primaryIndicator: 'Y'});
    this.dataAdressList.push({type: 'Associate', addressLine1: 'Some Steet Name', addressLine2: 'Number 202', city: 'Alexandria', state: 'VA',
                      postalCode: '22222', country: 'US', mailAddrIndicator: 'Y', primaryIndicator: 'N'});
    this.dataSource = new MatTableDataSource<any>(this.dataAdressList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
