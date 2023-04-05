import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CreateBeiModalComponent } from 'src/app/core/modals/create-bei-modal/create-bei-modal.component';
import { AccountService } from 'src/app/core/services/account.service';
import { DetailsService } from 'src/app/core/services/details.service';

@Component({
  selector: 'app-business-details-tab',
  templateUrl: './business-details-tab.component.html',
  styleUrls: ['./business-details-tab.component.scss']
})
export class BusinessDetailsTabComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  constructor(public dialog: MatDialog, public detailsService: DetailsService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.detailsService.broadcastCurrentTabIndex(0);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
