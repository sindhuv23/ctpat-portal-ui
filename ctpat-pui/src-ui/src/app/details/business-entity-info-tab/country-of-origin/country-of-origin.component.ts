import { AfterViewInit, Component, Inject, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddCountryOfOriginModalComponent } from 'src/app/core/modals/business-type-specific-modals/add-country-of-origin-modal/add-country-of-origin-modal.component';
import { EditCountryOfOriginModalComponent } from 'src/app/core/modals/business-type-specific-modals/edit-country-of-origin-modal/edit-country-of-origin-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { EditCoModalComponent } from 'src/app/core/modals/business-type-specific-modals/edit-co-modal/edit-co-modal.component';
import { AccountService } from 'src/app/core/services/account.service';
import { BeiTabService } from 'src/app/core/services/bei-tab.service';
import { ReferenceService } from 'src/app/core/services/reference.service';
import { MatSort } from '@angular/material/sort';
import { DetailsService } from 'src/app/core/services/details.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-country-of-origin',
  templateUrl: './country-of-origin.component.html',
  styleUrls: ['./country-of-origin.component.scss']
})
export class CountryOfOriginComponent implements OnInit,  OnDestroy {

  public ctpatAccountId = '';
  private subscriptions = new Subscription();
  public coData: any;
  @ViewChild(MatSort) matSort!: MatSort;

  displayedColumnsCoTrade: string[] = ['percentage_of_import', 'country_id', 'state_id', 'city_id'];
  displayedColumnsCoInternal: string[] =
  ['percentage_of_import', 'country_id', 'state_id', 'city_id', 'preferred_rank', 'id'];
  displayedColumnsPreviousVisits: string[] = ['countryVisited', 'visitDate', 'companyName'];

  public dataCoTrade: any[] = [];
  public dataSourceCoTrade = new MatTableDataSource<any>();
  public dataCoInternal: any[] = [];
  public dataSourceCoInternal = new MatTableDataSource<any>();
  public dataPreviousVisits: any[] = [];
  public dataSourcePreviousVisits = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog, public accountService: AccountService, private beiTabService: BeiTabService,
              public referenceService: ReferenceService, private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.accountId$.subscribe(aid => {
        this.ctpatAccountId = aid;

        this.beiTabService.getCo(this.ctpatAccountId).subscribe(data => {
          this.dataCoTrade = data;
          this.dataSourceCoTrade = new MatTableDataSource<any>(this.dataCoTrade);
          this.dataSourceCoTrade.sort = this.matSort;

          if (this.dataCoTrade && this.dataCoTrade.length !== 0){
            this.accountService.broadcastProfileIndicatorCo(true);
          } else {
            this.accountService.broadcastProfileIndicatorCo(false);
          }
        });

        this.beiTabService.getCoInternal(this.ctpatAccountId).subscribe(data => {
          this.dataCoInternal = data;
          this.dataSourceCoInternal = new MatTableDataSource<any>(this.dataCoInternal);
          this.dataSourceCoInternal.sort = this.matSort;
        });

      }));
  }

  editCo(): void{
    const dialogRef = this.dialog.open(EditCoModalComponent, {
      data: {ctpatAccountId: this.ctpatAccountId,
        dataCoTrade: this.dataCoTrade},
      width: '1000px',
      height: '500px',
      disableClose: true
    });
  }

  addCoInternal(id: any): void{
    const dialogRef = this.dialog.open(AddCountryOfOriginModalComponent, {
      data: {ctpatAccountId: this.ctpatAccountId,
        dataCoInternal: this.dataCoInternal},
      width: '600px',
      height: '400px',
      disableClose: true
    });
  }

  editCoInternal(id: any): void{
    const dialogRef = this.dialog.open(EditCountryOfOriginModalComponent, {
      data: {id, ctpatAccountId: this.ctpatAccountId,
        dataCoInternal: this.dataCoInternal},
      width: '600px',
      height: '400px',
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
        this.beiTabService.deleteCoInternal(id).subscribe(data =>{
          this.accountService.broadcastAccountId(parseInt(this.ctpatAccountId, 10));
          this.detailsService.broadcastCurrentTabIndex(1);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
