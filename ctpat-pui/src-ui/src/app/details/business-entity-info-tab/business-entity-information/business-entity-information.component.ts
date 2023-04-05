import { AfterViewInit, Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddNewBeiModalComponent } from 'src/app/core/modals/create-bei-modal/add-new-bei-modal/add-new-bei-modal.component';
import { EditBeiModalComponent } from 'src/app/core/modals/create-bei-modal/edit-bei-modal/edit-bei-modal.component';
import { BeiAccountCrudService } from 'src/app/core/services/bei-account-crud.service';

import { AccountService } from 'src/app/core/services/account.service';
import { RefreshService } from 'src/app/core/services/refresh.service';
import { BeiTabService } from 'src/app/core/services/bei-tab.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-business-entity-information',
  templateUrl: './business-entity-information.component.html',
  styleUrls: ['./business-entity-information.component.scss']
})
export class BusinessEntityInformationComponent implements OnInit, OnDestroy {


  private subscriptions = new Subscription();

  displayedColumnsBeiRecords: string[] = ['beiType', 'beiValue',  'benefitTxt', 'vettedApproved', 'beiAction'];
  private dataBeiRecords: any[] = [];
  public dataSourceBeiRecords = new MatTableDataSource<any>();
  private ctpatAccountId: any;
  public businessTypeId: any;

  public hasIata = false;
  public hasBond = false;
  public hasDuns = false;
  public hasEin = false;
  public hasMid = false;
  public hasBrokerLicenseNumber = false;
  public hasFilerCode = false;
  public hasSctNumber = false;
  public hasScac = false;
  public hasCbp = false;
  public hasDot = false;
  public hasFmc = false;
  public hasTsa = false;
  public hasIor = false;

  constructor(public dialog: MatDialog, private accountService: AccountService, private beiTabService: BeiTabService,
              private beiCrudService: BeiAccountCrudService, private refreshService: RefreshService) { }

  ngOnInit(): void {
     this.subscriptions.add(
      this.accountService.accountId$.subscribe(id => this.ctpatAccountId = id)
     );
     this.subscriptions.add(
      this.accountService.businessTypeId$.subscribe(id => this.businessTypeId = id)
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
    // this.subscriptions.add(
    //   this.beiCrudService.getAllByCtPatAccountId(this.ctpatAccountId).subscribe(data=>{
    //     this.dataBeiRecords=data;
    //     this.dataSourceBeiRecords = new MatTableDataSource<any>(this.dataBeiRecords);
    //     this.checkBeiData();
    //   })
    // );

    this.subscriptions.add(
      this.beiTabService.getBeiV2(this.ctpatAccountId).subscribe(data => {
        this.dataBeiRecords = data;
        this.dataSourceBeiRecords = new MatTableDataSource<any>(this.dataBeiRecords);
        this.checkBeiData();
      })
    );
  }

  // open add bei modal. if new bei saved, publish form the modal and update this display section from backend.
  addNewBeiRecord(): void{
    const dialogRef = this.dialog.open(AddNewBeiModalComponent, {
      data: {},
      width: '600px',
      height: '300px',
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
    // this.subscriptions.add(
    //   this.beiCrudService.delete(id).subscribe(response => {
    //     this.dataSourceBeiRecords = new MatTableDataSource<any>(this.dataBeiRecords);
    //     this.ngOnInit();
    //   })
    //   );

    this.subscriptions.add(
        this.beiTabService.deleteBeiV2(id).subscribe(response => {
          this.dataSourceBeiRecords = new MatTableDataSource<any>(this.dataBeiRecords);
          this.ngOnInit();
        })
        );
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

  checkBeiData(): void{
    this.hasIata = false;
    this.hasBond = false;
    this.hasDuns = false;
    this.hasEin = false;
    this.hasMid = false;
    this.hasBrokerLicenseNumber = false;
    this.hasFilerCode = false;
    this.hasSctNumber = false;
    this.hasScac = false;
    this.hasCbp = false;
    this.hasDot = false;
    this.hasFmc = false;
    this.hasTsa = false;
    this.hasIor = false;
    this.dataBeiRecords.forEach(
      record => {
        if (record.eligibilityCatalogId == 4400 || record.eligibilityCatalogId == 4401){
          this.hasIata = true;
        } else if (record.eligibilityCatalogId == 4100 || record.eligibilityCatalogId == 4101 || record.eligibilityCatalogId == 4102){
          this.hasBond = true;
        } else if (record.eligibilityCatalogId == 4751 || record.eligibilityCatalogId == 4755){
          this.hasDuns = true;
        } else if (record.eligibilityCatalogId == 4750){
          this.hasEin = true;
        } else if (record.eligibilityCatalogId == 4500){
          this.hasMid = true;
        } else if (record.eligibilityCatalogId == 4700){
          this.hasBrokerLicenseNumber = true;
        } else if (record.eligibilityCatalogId == 4900){
          this.hasFilerCode = true;
        } else if (record.eligibilityCatalogId == 5000){
          this.hasSctNumber = true;
        } else if (record.eligibilityCatalogId == 4000 || record.eligibilityCatalogId == 4001 || record.eligibilityCatalogId == 4002){
          this.hasScac = true;
        } else if (record.eligibilityCatalogId == 4302){
          this.hasCbp = true;
        } else if (record.eligibilityCatalogId == 4300 || record.eligibilityCatalogId == 4301){
          this.hasDot = true;
        } else if (record.eligibilityCatalogId == 4200 || record.eligibilityCatalogId == 4201
          || record.eligibilityCatalogId == 4202 || record.eligibilityCatalogId == 4203){
          this.hasFmc = true;
        } else if (record.eligibilityCatalogId == 4801){
          this.hasTsa = true;
        } else if (record.eligibilityCatalogId == 4600){
          this.hasIor = true;
        }
      }
    );

    this.accountService.broadcastProfileIndicatorBei(true);
    if (this.businessTypeId == 1 && (!this.hasIata || !this.hasBond)){
        this.accountService.broadcastProfileIndicatorBei(false);
    } else if (this.businessTypeId == 3 && !this.hasMid){
        this.accountService.broadcastProfileIndicatorBei(false);
    } else if (this.businessTypeId == 5 && (!this.hasBond || !this.hasIor)){
        this.accountService.broadcastProfileIndicatorBei(false);
    } else if (this.businessTypeId == 6 &&  (!this.hasBrokerLicenseNumber || !this.hasFilerCode)){
        this.accountService.broadcastProfileIndicatorBei(false);
    }  else if ((this.businessTypeId == 7 || this.businessTypeId == 8) && (!this.hasScac || !this.hasBond)){
        this.accountService.broadcastProfileIndicatorBei(false);
    }  else if (this.businessTypeId == 9 && ((!this.hasFmc && !this.hasIata) || !this.hasBond)){
        this.accountService.broadcastProfileIndicatorBei(false);
    } else if (this.businessTypeId == 15 && !this.hasSctNumber){
        this.accountService.broadcastProfileIndicatorBei(false);
    } else if (this.businessTypeId == 17 && (!this.hasCbp && !this.hasDot && !this.hasFmc && !this.hasTsa)){
        this.accountService.broadcastProfileIndicatorBei(false);
    } else if (this.businessTypeId == 18 &&  (!this.hasDuns && !this.hasEin)){
        this.accountService.broadcastProfileIndicatorBei(false);
    } else if ((this.businessTypeId == 4 || this.businessTypeId == 10 || this.businessTypeId == 11) && (!this.hasScac || !this.hasDot)){
      this.accountService.broadcastProfileIndicatorBei(false);
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
