import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddBusinessHistoryModalComponent } from '../../add-business-history-modal/add-business-history-modal.component';
import { ConfirmationDialogModalComponent } from './../../confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-business-history',
  templateUrl: './business-history.component.html',
  styleUrls: ['./business-history.component.scss']
})
export class BusinessHistoryComponent implements OnInit, AfterViewInit {

  displayedColumnsCompanyNameList: string[] = ['businessHistory', 'entryId'];
 private databusinessHistoryList: any[] = [];
 public dataSourcedataBusinessHistoryList = new MatTableDataSource<any>();

 constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.databusinessHistoryList.push({businessHistory: 'This business history info was entered by trade partner during application. Brief company history text goes here.', 
    entryId: 0});
    this.databusinessHistoryList.push({businessHistory: 'Brief company history text goes here.', 
    entryId: 1});
    this.dataSourcedataBusinessHistoryList = new MatTableDataSource<any>(this.databusinessHistoryList);
  }

  addBusinessHistory(): void{
    console.log('open add business history modal');
    const confirmRef = this.dialog.open(AddBusinessHistoryModalComponent, {
      disableClose: true,
      width: '600px',
      height: '250px',
      data: {}
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
        this.deleteBusinessHistoryListEntry(id);
      }
    });
  }

  deleteBusinessHistoryListEntry(id: any): void{
    this.databusinessHistoryList.splice(id, 1);
    for (let i = 0; i < this.databusinessHistoryList.length; i++) {
     this.databusinessHistoryList[i].entryId = i;
    }
    this.dataSourcedataBusinessHistoryList = new MatTableDataSource<any>(this.databusinessHistoryList);
  }

  // open edit company name modal
  editCompanyNameEntry(row: any): void{
    console.log('edit row ' + row);
    const confirmRef = this.dialog.open(AddBusinessHistoryModalComponent, {
      disableClose: true,
      width: '600px',
      height: '250px',
      data: {row}
    });
  }

}
