import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { DetailsService } from 'src/app/core/services/details.service';

@Component({
  selector: 'app-business-entity-info-tab',
  templateUrl: './business-entity-info-tab.component.html',
  styleUrls: ['./business-entity-info-tab.component.scss']
})
export class BusinessEntityInfoTabComponent implements OnInit, OnDestroy {

  public hideCeeSection = true;
  public hideCoSection = true;
  public hideTransportSection = true;
  public hideHwyCarrierSection = true;

  private subscriptions = new Subscription();
  private ctpatAccountId: any;
  private businessTypeId: any;

  constructor(public dialog: MatDialog, public accountService: AccountService, public detailsService: DetailsService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.accountId$.subscribe(aid => {
        this.ctpatAccountId = aid;
        this.accountService.businessTypeId$.subscribe(bid => {
          this.businessTypeId = '' + bid;
          this.setupSection();
        });
      })
     );

    this.detailsService.broadcastCurrentTabIndex(1);
  }

  setupSection(): void{
    if (['1', '3', '6', '7', '8', '12', '15', '16', '17', '18'].includes(this.businessTypeId)){
      this.hideCeeSection = true;
      this.hideCoSection = true;
      this.hideTransportSection = true;
      this.hideHwyCarrierSection = true;
    } else if (this.businessTypeId == '5') {
      this.hideCeeSection = false;
      this.hideCoSection = false;
      this.hideTransportSection = true;
      this.hideHwyCarrierSection = true;
    } else if (this.businessTypeId == '9') {
      this.hideCeeSection = true;
      this.hideCoSection = true;
      this.hideTransportSection = false;
      this.hideHwyCarrierSection = true;
    } else if (['4', '10', '11'].includes(this.businessTypeId)){
      this.hideCeeSection = true;
      this.hideCoSection = true;
      this.hideTransportSection = true;
      this.hideHwyCarrierSection = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
