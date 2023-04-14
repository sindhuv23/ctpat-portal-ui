import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddNewBeiModalComponent } from '../../create-bei-modal/add-new-bei-modal/add-new-bei-modal.component';

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
     duplicateAccountName: 'Test account', duplicateAccountNumber: '12354456', derogatoryIndicator: 'N', entryId: 0});
    this.dataBeiList.push({beiType: 'IOR', beiValue: 222222, vettedApproved: 'Y',
     duplicateAccountName: 'Rbndnb Ltd', duplicateAccountNumber: '548221', derogatoryIndicator: 'N', entryId: 1});
    this.dataBeiList.push({beiType: 'DUNS', beiValue: 44322, vettedApproved: '',
     duplicateAccountName: 'Oranges Ltd', duplicateAccountNumber: '1234567', derogatoryIndicator: 'Y', entryId: 2});
    this.dataSourceBeiList = new MatTableDataSource<any>(this.dataBeiList);
  }

  addBei(): void{
    console.log('open add BEI modal');
    const confirmRef = this.dialog.open(AddNewBeiModalComponent, {
      disableClose: true,
      width: '600px',
      height: '400px',
      data: {parentType: 'Vetting'}
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
  editBeiEntry(row: any): void{
    console.log('edit row ' + row);
    const confirmRef = this.dialog.open(AddNewBeiModalComponent, {
      disableClose: true,
      width: '600px',
      height: '400px',
      data: {row, parentType: 'Vetting'}
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
