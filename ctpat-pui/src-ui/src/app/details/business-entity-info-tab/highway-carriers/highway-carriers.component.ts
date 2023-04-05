import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditHwyCarrierModalComponent } from 'src/app/core/modals/business-type-specific-modals/edit-hwy-carrier-modal/edit-hwy-carrier-modal.component';
import { AccountService } from 'src/app/core/services/account.service';
import { BeiTabService } from 'src/app/core/services/bei-tab.service';
import { ReferenceService } from 'src/app/core/services/reference.service';

@Component({
  selector: 'app-highway-carriers',
  templateUrl: './highway-carriers.component.html',
  styleUrls: ['./highway-carriers.component.scss']
})
export class HighwayCarriersComponent implements OnInit, OnDestroy {

  // display
  public borderCrossed = '';
  public numBorderCrossings = '';
  public borderCrossings = '';
  public servicesOffered = '';
  public driverSources = '';

  public ctpatAccountId = '';
  private subscriptions = new Subscription();
  public hwyCarrierData: any;

  constructor(public dialog: MatDialog, public accountService: AccountService, private beiTabService: BeiTabService,
              private referenceService: ReferenceService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.accountId$.subscribe(aid => {
        this.ctpatAccountId = aid;

        this.beiTabService.getHwyCarrier(this.ctpatAccountId).subscribe(data => {
          this.hwyCarrierData = data;
          this.displayHwyCarrier();
        });
      })
     );
  }

  displayHwyCarrier(): void{
    this.borderCrossed = '';
    this.numBorderCrossings = '';
    this.borderCrossings = '';
    this.servicesOffered = '';
    this.driverSources = '';

    for (const record of this.hwyCarrierData){
      if (record.key === 'hwc_borderscrossed'){
        if (record.value === 'CAN'){
          this.borderCrossed = 'U.S. / Canadian Border';
        } else if (record.value === 'MEX'){
          this.borderCrossed = 'U.S. / Mexican Border';
        } else if (record.value === 'BOTH'){
          this.borderCrossed = 'Both U.S. / Canadian & U.S. / Mexican Borders';
        }
      } else if (record.key === 'hwc_borderscrossed_number'){
        this.numBorderCrossings = record.value;
      } else if (record.key === 'hwc_borderscrossing_locations'){
        this.borderCrossings += ' ' + this.referenceService.getBorderCrossingName(record.value) + '. ';
      } else if (record.key === 'hwc_services_offered'){
        this.servicesOffered += ' ' + this.referenceService.getServiceOfferedName(record.value) + ', ';
      } else if (record.key === 'hwc_driver_sources'){
        this.driverSources += ' ' + this.referenceService.getDriverSourceName(record.value) + ', ';
      }
    }
    if (this.borderCrossings){
      this.borderCrossings = this.borderCrossings.slice(0, -2);
    }
    if (this.servicesOffered){
      this.servicesOffered = this.servicesOffered.slice(0, -2);
    }
    if (this.driverSources){
      this.driverSources = this.driverSources.slice(0, -2);
    }

    if (this.borderCrossed && this.numBorderCrossings && this.borderCrossings && this.servicesOffered && this.driverSources){
      this.accountService.broadcastProfileIndicatorHwyCarrier(true);
    } else {
      this.accountService.broadcastProfileIndicatorHwyCarrier(false);
    }
  }

  editHwyCarrier(): void{
    const dialogRef = this.dialog.open(EditHwyCarrierModalComponent, {
      data: {ctpatAccountId: this.ctpatAccountId,
        hwyCarrierData: this.hwyCarrierData},
      width: '900px',
      height: '400px',
      disableClose: true
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
