import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { DetailsService } from 'src/app/core/services/details.service';

@Component({
  selector: 'app-security-profile-tab',
  templateUrl: './security-profile-tab.component.html',
  styleUrls: ['./security-profile-tab.component.scss']
})
export class SecurityProfileTabComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  constructor(public detailsService: DetailsService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.detailsService.broadcastCurrentTabIndex(3);
  }

  addBusinessEntityInfo(): void{
    this.detailsService.broadcastCurrentTabIndex(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
