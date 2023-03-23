import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddNewBeiModalComponent } from 'src/app/core/modals/create-bei-modal/add-new-bei-modal/add-new-bei-modal.component';
import { EditBeiModalComponent } from 'src/app/core/modals/create-bei-modal/edit-bei-modal/edit-bei-modal.component';
import { BeiAccountCrudService } from 'src/app/core/services/bei-account-crud.service';

import { AccountService } from 'src/app/core/services/account.service';
import { RefreshService } from 'src/app/core/services/refresh.service';

@Component({
  selector: 'app-business-entity-information',
  templateUrl: './business-entity-information.component.html',
  styleUrls: ['./business-entity-information.component.scss']
})
export class BusinessEntityInformationComponent implements OnInit, OnDestroy, AfterViewInit {

  
  private subscriptions = new Subscription();

  displayedColumnsBeiRecords: string[] = ['beiType', 'beiValue',  'benefitTxt', 'vettedApproved', 'beiAction'];
  private dataBeiRecords: any[] = [];
  public dataSourceBeiRecords = new MatTableDataSource<any>();
  private ctpatAccountId: any;



  constructor(public dialog: MatDialog, private accountService: AccountService,
        private beiCrudService: BeiAccountCrudService, private refreshService: RefreshService) { }

  ngOnInit(): void {
     this.subscriptions.add(
      this.accountService.accountId$.subscribe(id => this.ctpatAccountId = id)
     );
     console.log("CTPAT ACCOUNTID is " + this.ctpatAccountId);
     this.refresh();
    // Subscribe to the refresh event
    this.subscriptions.add(
    this.refreshService.refreshEvent.subscribe(() => {
      this.refresh();
      this.ngOnInit();
    })
    );
    
  }

  refresh() {
    this.subscriptions.add(
      this.beiCrudService.getAllByCtPatAccountId(this.ctpatAccountId).subscribe(data=>{    
        this.dataBeiRecords=data;
        //console.log(this.dataBeiRecords);
        this.dataSourceBeiRecords = new MatTableDataSource<any>(this.dataBeiRecords);
      })
    );
    // Implement your refresh logic here
  }


  ngAfterViewInit(): void{
    // this.dataBeiRecords.push({beiType: 'BOND', beiValue: 123456, vettedApproved: '', beiBenefit: 'NONE', tradeCompliance: '', entryId: 0});
    // this.dataBeiRecords.push({beiType: 'IOR', beiValue: 222222, vettedApproved: 'Y', beiBenefit: 'NONE', tradeCompliance: 'Y', entryId: 1});
    // this.dataBeiRecords.push({beiType: 'DUNS', beiValue: 66666, vettedApproved: '', beiBenefit: 'NONE', tradeCompliance: '', entryId: 2});
    
    
    // console.log(this.dataBeiRecords);
    
  }

  // open add bei modal. if new bei saved, publish form the modal and update this display section from backend.
  addNewBeiRecord(): void{
    const dialogRef = this.dialog.open(AddNewBeiModalComponent, {
      data: {},
      width: '600px',
      height: '227px',  
      disableClose: true
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
        this.deleteBeiRecordEntry(id);
        this.refresh();
      }
    });
  }

  // this method is not needed when backend is connected. retrieval of updated data deletes the record.
  deleteBeiRecordEntry(id: any): void{
    // this.dataBeiRecords.splice(id, 1);
    // for (let i = 0; i < this.dataBeiRecords.length; i++) {
    //  this.dataBeiRecords[i].entryId = i;
    // }
    console.log(`deleting BEI ID ${id}`);
    this.subscriptions.add(
      this.beiCrudService.delete(id).subscribe(response=>console.log(response))
      );
    this.dataSourceBeiRecords = new MatTableDataSource<any>(this.dataBeiRecords);
    this.ngOnInit();
  }

  // open edit bei modal. if new bei saved, publish from the modal and update this display section from backend.
  editBeiRecordEntry(beiObject: any): void{
    const dialogRef = this.dialog.open(EditBeiModalComponent, {
      data: {beiObject},
      width: '600px',
      height: '400px',
      disableClose: true
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
