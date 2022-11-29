import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  private subscriptions = new Subscription();
  public isLoading = false;

  private dataContactList: any[] = [];
  public dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['salutation', 'firstName', 'lastName', 'title', 'type', 'email', 'telephone', 'primaryIndicator', 'lastLogin'];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataContactList.push({salutation: 'Mr.', firstName: 'Gabriel', lastName: 'Wasserman', title: 'Manager', type: 'Admin',
                  email: 'gabrielwass@gmail.com', telephone: '123-456-9000', primaryIndicator: 'Y', lastLogin: '03/25/2022 11:00 am'});
    this.dataContactList.push({salutation: 'Ms.', firstName: 'Nancy', lastName: 'LastName', title: 'Accountant', type: 'ReadOnly',
                        email: 'someone@gmail.com', telephone: '123-456-9001', primaryIndicator: 'N', lastLogin: '04/12/2022 12:00 pm'});
    this.dataSource = new MatTableDataSource<any>(this.dataContactList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
