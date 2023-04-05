import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { BeiTabService } from 'src/app/core/services/bei-tab.service';
import { EditCeeModalComponent } from 'src/app/core/modals/business-type-specific-modals/edit-cee-modal/edit-cee-modal.component';
import { ReferenceService } from 'src/app/core/services/reference.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-center-excellence-expertise',
  templateUrl: './center-excellence-expertise.component.html',
  styleUrls: ['./center-excellence-expertise.component.scss']
})
export class CenterExcellenceExpertiseComponent implements OnInit, OnDestroy {

  // display
  public approval = '';
  public cee = '';
  public commodities = '';

  public ctpatAccountId = '';
  private subscriptions = new Subscription();
  public ceeData: any;

  constructor(public dialog: MatDialog, public accountService: AccountService, private beiTabService: BeiTabService,
              private referenceService: ReferenceService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.accountId$.subscribe(aid => {
        this.ctpatAccountId = aid;

        this.beiTabService.getCee(this.ctpatAccountId).subscribe(data => {
          this.ceeData = data;
          this.displayCee();
        });
      })
     );
  }

  displayCee(): void{
    this.approval = '';
    this.cee = '';
    this.commodities = '';

    for (const record of this.ceeData){
      if (record.importer_cee_code === 'cee_approved'){
        if (record.importer_cee_values === 'Y'){
          this.approval = 'Yes';
        } else if (record.importer_cee_values === 'N'){
          this.approval = 'No';
        }
      } else if (record.importer_cee_code === 'cee_center'){
        this.cee = this.referenceService.getEsCenterName(record.importer_cee_values);
      } else if (record.importer_cee_code === 'cee_commodities'){
        this.commodities += ' ' + this.referenceService.getEsCenterName(record.importer_cee_values) + '. ';
      }
    }
    if (this.cee && this.commodities){
      this.accountService.broadcastProfileIndicatorCee(true);
      this.commodities = this.commodities.slice(0, -2);
    } else {
      this.accountService.broadcastProfileIndicatorCee(false);
    }
  }

  editCee(): void{
    const dialogRef = this.dialog.open(EditCeeModalComponent, {
      data: {ctpatAccountId: this.ctpatAccountId,
        ceeData: this.ceeData},
      width: '800px',
      height: '500px',
      disableClose: true
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
