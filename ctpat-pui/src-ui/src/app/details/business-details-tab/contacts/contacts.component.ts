import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddOrConfirmEmailComponent} from '../add-or-confirm-email/add-or-confirm-email.component';
import { AddNewContactUserComponent } from '../add-new-contact-user/add-new-contact-user.component';
import { ConfirmSetPrimaryDialogComponent } from '../confirm-set-primary-dialog/confirm-set-primary-dialog.component';
import { AccountService } from 'src/app/core/services/account.service';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
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
  private ctpatAccountId!: any;
  public tcInd = 'N';

  public dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['salutation', 'firstName', 'lastName', 'title', 'type', 'email', 'telephone', 'primaryIndicator', 'emailNotificatonPortal', 'lastLogin', 'entryId'];

  constructor(public dialog : MatDialog, private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id) {
        this.ctpatAccountId = id;
       this.fetchContactDetails();
      }
    }));

    this.subscriptions.add(this.accountService.detailTitleBar$.subscribe((data: any) => {
      if (data) {
       this.tcInd = data.tcInd;
       const index = this.displayedColumns.indexOf('emailNotificatonTC');
       console.log
       if( this.tcInd === 'Y' && index < 0){ 
        this.displayedColumns.splice(9, 0, 'emailNotificatonTC');
       }else if(this.tcInd !== 'Y' && index > 0){
        this.displayedColumns.splice(index, 1);
       }
      }
    }));

    this.subscriptions.add(this.accountService.ctpatContact$.subscribe(() => {
      this.fetchContactDetails();
    }));
  }

fetchContactDetails(){
  this.dataSource = new MatTableDataSource<any>([]);
  this.accountService.getTcAccountContactsByCtpatId(this.ctpatAccountId).subscribe((contacts: any[]) => {
    if (contacts) {
      const records: any[] = [];
      contacts.forEach(contact => {
        records.push({
          salutation: contact.salutation,
          firstName: contact.firstName,
          lastName: contact.lastName,
          title: contact.title,
          type: contact.contactType,
          email: contact.email,
          telephone: contact.telephone,
          primaryIndicator: contact.primaryContact,
          emailNotificatonPortal: contact.emailNotificationPortal,
          emailNotificatonTC: contact.emailNotificationTc,
          entryId: contact.id
        });
      });
      this.dataSource = new MatTableDataSource<any>(records);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    }
  })
}

  ngAfterViewInit(): void{

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

        dialogRef.afterClosed().subscribe((result: any) => {
          this.fetchContactDetails();
        });
  }

  editUser(email : any): void {

    const dialogRef = this.dialog.open(AddNewContactUserComponent, 
      {
        data : {email : email, source: 'edit', ctpatAccountId: this.ctpatAccountId},
        height : '600px',
        width : '1200px'
      });
  }

  deleteUser(id : any): void {
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
        this.accountService.deleteCtpatAccountUser(id, this.ctpatAccountId).subscribe(res => {
          console.log("CTPAT Account user deleted");
          this.fetchContactDetails();
        });
      }
    });
  }

  setPrimaryConfirmDialog(contactId: any) {
    
    const confirmRef = this.dialog.open(ConfirmSetPrimaryDialogComponent, {
      disableClose: true,
      width: '460px',
      height: '200px',
      data: {
        title: 'Confirm Primary Contact',
        message: 'Warning, setting this address as primary will remove any previously  designated primary settings. Please select OK to proceed or cancel to exit without changes.'
      }
    });

    confirmRef.afterClosed().subscribe((result) => {
      if(result) {
          this.accountService.updateUsersPrimaryInd(this.ctpatAccountId, contactId).subscribe((result) => {
            this.fetchContactDetails();
          });
      }
    });
  }

  stopSpinner(): void {
    this.accountService.broadcastDetailLoadingStatus(false);
  }
  
}
