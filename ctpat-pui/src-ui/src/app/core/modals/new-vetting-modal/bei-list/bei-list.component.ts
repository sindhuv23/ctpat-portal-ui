import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-bei-list',
  templateUrl: './bei-list.component.html',
  styleUrls: ['./bei-list.component.scss']
})
export class BeiListComponent implements OnInit, OnDestroy, AfterViewInit {

  public beiListForm!: FormGroup;

  private subscriptions = new Subscription();

  displayedColumnsBeiList: string[] = ['beiType', 'beiValue', 'vettedApproved', 'duplicateAccountName',
  'duplicateAccountNumber', 'derogatoryIndicator', 'entryId'];
  private dataBeiList: any[] = [];
  public dataSourceBeiList = new MatTableDataSource<any>();

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.beiListForm = this.formBuilder.group({
      beiFindings: new FormControl('')
    });
  }

  ngAfterViewInit(): void{
    this.dataBeiList.push({beiType: 'BOND', beiValue: 123456, vettedApproved: '',
     duplicateAccountName: '', duplicateAccountNumber: '', derogatoryIndicator: 'N', entryId: 0});
    this.dataBeiList.push({beiType: 'IOR', beiValue: 222222, vettedApproved: 'Y',
     duplicateAccountName: '', duplicateAccountNumber: '', derogatoryIndicator: 'N', entryId: 1});
    this.dataBeiList.push({beiType: 'DUNS', beiValue: 44322, vettedApproved: '',
     duplicateAccountName: 'Oranges Ltd', duplicateAccountNumber: '1234567', derogatoryIndicator: 'Y', entryId: 2});
    this.dataSourceBeiList = new MatTableDataSource<any>(this.dataBeiList);
  }

  addBei(): void{
    console.log('open add BEI modal');
  }

  confirmDeletion(id: any): void{
    const confirmRef = this.dialog.open(ConfirmationDialogModalComponent, {
      disableClose: true,
      width: '460px',
      data: {
        title: 'Please Confirm Delete Action',
        message: 'This record will be deleted and cannot be recovered. \nContinue to delete?'
      }
    });
    confirmRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBeiListEntry(id);
      }
    });
  }

  deleteBeiListEntry(id: any): void{
    this.dataBeiList.splice(id, 1);
    for (let i = 0; i < this.dataBeiList.length; i++) {
     this.dataBeiList[i].entryId = i;
    }
    this.dataSourceBeiList = new MatTableDataSource<any>(this.dataBeiList);
  }

  // open edit company name modal
  editBeiEntry(id: any): void{
    console.log('edit ID ' + id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

