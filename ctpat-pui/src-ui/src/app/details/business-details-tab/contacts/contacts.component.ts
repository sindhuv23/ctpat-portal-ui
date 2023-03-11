import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddOrConfirmEmailComponent} from '../add-or-confirm-email/add-or-confirm-email.component';
import { AddNewContactUserComponent } from '../add-new-contact-user/add-new-contact-user.component';
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

  displayedColumns: string[] = ['salutation', 'firstName', 'lastName', 'title', 'type', 'email', 'telephone', 'primaryIndicator', 'lastLogin', 'entryId'];

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataContactList.push({salutation: 'Mr.', firstName: 'Gabriel', lastName: 'Wasserman', title: 'Manager', type: 'Admin',
                  email: 'vivsindhu@gmail.com', telephone: '123-456-9000', primaryIndicator: 'Y', lastLogin: '03/25/2022 11:00 am'});
    this.dataContactList.push({salutation: 'Ms.', firstName: 'Nancy', lastName: 'LastName', title: 'Accountant', type: 'ReadOnly',
                        email: 'someone@gmail.com', telephone: '123-456-9001', primaryIndicator: 'N', lastLogin: '04/12/2022 12:00 pm'});
    this.dataSource = new MatTableDataSource<any>(this.dataContactList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addNewUser() : void {
      const dialogRef = this.dialog.open(AddOrConfirmEmailComponent, 
        {
          data : {},
          height : '250px',
          width : '800px'
        });
  }

  editUser(email : any): void {

    const dialogRef = this.dialog.open(AddNewContactUserComponent, 
      {
        data : {email : email, source: 'edit' },
        height : '600px',
        width : '1200px'
      });

  }
}
