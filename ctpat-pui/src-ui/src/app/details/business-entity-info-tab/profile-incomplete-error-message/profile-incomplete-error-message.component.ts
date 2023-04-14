import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { DetailsService } from 'src/app/core/services/details.service';

@Component({
  selector: 'app-profile-incomplete-error-message',
  templateUrl: './profile-incomplete-error-message.component.html',
  styleUrls: ['./profile-incomplete-error-message.component.scss']
})
export class ProfileIncompleteErrorMessageComponent implements OnInit, OnDestroy {

  public hideProfileWarning = true;
  private profileIndicatorBei = true;
  private profileIndicatorTransport = true;
  private profileIndicatorCee = true;
  private profileIndicatorHwyCarrier = true;
  private profileIndicatorCo = true;
  public currentTabIndex!: number;
  private subscriptions = new Subscription();
  public businessTypeId: any;

  constructor(public dialog: MatDialog, public detailsService: DetailsService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.detailsService.currentTab$.subscribe(index => this.currentTabIndex = index)
    );
    this.subscriptions.add(
      this.accountService.businessTypeId$.subscribe(id => this.businessTypeId = id)
     );

    this.subscriptions.add(
      this.accountService.profileIndicatorBei$.subscribe((status: boolean) => {
        this.profileIndicatorBei = status;
        this.updateProfileWarningStatus();
      })
     );
    this.subscriptions.add(
      this.accountService.profileIndicatorTransport$.subscribe((status: boolean) => {
        this.profileIndicatorTransport = status;
        this.updateProfileWarningStatus();
      })
     );
    this.subscriptions.add(
      this.accountService.profileIndicatorCee$.subscribe((status: boolean) => {
        this.profileIndicatorCee = status;
        this.updateProfileWarningStatus();
      })
     );
    this.subscriptions.add(
      this.accountService.profileIndicatorHwyCarrier$.subscribe((status: boolean) => {
        this.profileIndicatorHwyCarrier = status;
        this.updateProfileWarningStatus();
      })
     );
    this.subscriptions.add(
      this.accountService.profileIndicatorCo$.subscribe((status: boolean) => {
        this.profileIndicatorCo = status;
        this.updateProfileWarningStatus();
      })
     );
  }

  updateProfileWarningStatus(): void{
    if (this.businessTypeId == 9){ // consolidator
      this.hideProfileWarning = this.profileIndicatorBei && this.profileIndicatorTransport;
    } else if (this.businessTypeId == 5){ // importer
      this.hideProfileWarning = this.profileIndicatorBei && this.profileIndicatorCee && this.profileIndicatorCo;
    } else if (this.businessTypeId == 4 || this.businessTypeId == 10 || this.businessTypeId == 11){ // highway carrier
      this.hideProfileWarning = this.profileIndicatorBei && this.profileIndicatorHwyCarrier;
    } else { // other business types
      this.hideProfileWarning = this.profileIndicatorBei;
    }

  }

  addBusinessEntityInfo(): void{
    this.detailsService.broadcastCurrentTabIndex(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
