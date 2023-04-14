import { AccountService } from './../core/services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddMilestoneModalComponent } from '../core/modals/add-milestone-modal/add-milestone-modal.component';
import { EligibilityModalComponent } from '../core/modals/eligibility-modal/eligibility-modal.component';
import { DetailsService } from '../core/services/details.service';
import { environment } from 'src/environments/environment';
import { BusinessEntityInformationComponent } from './business-entity-info-tab/business-entity-information/business-entity-information.component';
import { ModesOfTransportComponent } from './business-entity-info-tab/modes-of-transport/modes-of-transport.component';
import { CenterExcellenceExpertiseComponent } from './business-entity-info-tab/center-excellence-expertise/center-excellence-expertise.component';
import { CountryOfOriginComponent } from './business-entity-info-tab/country-of-origin/country-of-origin.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  currentTabIndex = 0;
  showActionMenu!: boolean;
  actionMenuItems: any;
  public ctpat_account_id = ''

  public accountName = '';
  public accountStatus = '';
  public applicationStatus = '';
  public anlStatus = '';
  public tcInd = "";
  ctpatAccountId = "";

  private subscriptions = new Subscription();
  public showDetails = false;
  public isLoadingDetails = false;


  constructor(public dialog: MatDialog, public detailsService: DetailsService, public accountService: AccountService,
              private businessEntityInformationComponent: BusinessEntityInformationComponent,
              private modesOfTransportComponent: ModesOfTransportComponent,
              private centerExcellenceExpertiseComponent: CenterExcellenceExpertiseComponent,
              private countryOfOriginComponent: CountryOfOriginComponent) { }

  ngOnInit(): void {
    this.showActionMenu = true;

    this.subscriptions.add(this.accountService.detailLoadingStatus$.subscribe((status: any) => {
      this.isLoadingDetails = status;
    }));

    this.subscriptions.add(this.accountService.detailTitleBar$.subscribe((titleBar: any) => {
      if (titleBar) {
        this.accountName = titleBar.companyName;
        this.accountStatus = titleBar.accountStatus;
        this.applicationStatus = titleBar.applicationStatus;
        this.anlStatus = titleBar.anlStatus;
      }
    }));

    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id) {
        this.currentTabIndex = 0;
        this.showDetails = true;
        this.ctpatAccountId = id;
        this.accountService.getAccountDetails(id).subscribe((data: any) => {
          if (data) {
            this.tcInd = data.tcInd;
            this.setActionItems();
          }
        }, error => {
        });

        this.businessEntityInformationComponent.ngOnInit();
        this.modesOfTransportComponent.ngOnInit();
        this.centerExcellenceExpertiseComponent.ngOnInit();
        this.countryOfOriginComponent.ngOnInit();
      }
    }));

    this.subscriptions.add(this.accountService.searchStatus$.subscribe((status: any) => {
      if (status) {
        this.showDetails = false;
      }
    }));

    this.subscriptions.add(this.detailsService.currentTab$.subscribe((index: any) => {
      if (index) {
        this.currentTabIndex = index;
      }
    }));
  }

  setActionItems(): void {
    var baseActionMenuItems = [{ name: 'Generate PDF', action: 'viewPDF' }, { name: 'Add Milestone', action: 'addMilestone' }];
    if (this.tcInd != "N") {
      baseActionMenuItems.push({ name: 'Launch Trade Compliance', action: 'launchTradeCompliance' });
    }
    this.actionMenuItems = baseActionMenuItems;
  }

  invokeMenuAction(action: string): void {
    if (action === 'viewPdf') {
      this.viewPdf();
    }
    if (action === 'addMilestone') {
      this.openAddMilestoneModal();
    }
    if (action === 'launchTradeCompliance') {
      this.launchTradeCompliance();
    }
  }

  viewPdf(): void { }

  openAddMilestoneModal(): void {
    const dialogRef = this.dialog.open(AddMilestoneModalComponent, {
      data: {title: "Add Milestone"},
      width: '560px',
      height: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result)=> {
      this.accountService.getMileStoneDets(this.ctpatAccountId).subscribe((milestones: any[]) => {
        if (milestones) {
          this.accountService.broadcastMilestoneResult(milestones);
        }
      })
    });
  }
  launchTradeCompliance(): void {

    //TODO: check for existing account by id
    // this.subscriptions.push(this.detailsService.getTradeComplianceAccount(this.ctpat_account_id).subscribe(account => {
    //   if (account != null && account !== ''){
    //     //link straight to tc
    //   }else{
    //     this.openEligibilityModal();
    //   }
    // }));

    this.openEligibilityModal();
  }
  openEligibilityModal(): void {
    if (this.tcInd == "E"){
      const dialogRef = this.dialog.open(EligibilityModalComponent, {
        data: {},
        width: '850px',
        height: '830px',
        disableClose: true
      });
    }else if (this.tcInd == "Y"){
      window.open(environment.tcLinkUrl + this.ctpatAccountId, '_blank')
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
