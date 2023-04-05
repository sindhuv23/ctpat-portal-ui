import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { UtilFunctions } from 'src/app/core/utils/ctpat.function';

@Component({
  selector: 'app-business-information',
  templateUrl: './business-information.component.html',
  styleUrls: ['./business-information.component.scss']
})
export class BusinessInformationComponent implements OnInit {

  private subscriptions = new Subscription();
  public accountData: any;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id) {
        this.accountService.getAccountDetails(id).subscribe((data: any) => {
          if (data) {
            this.accountService.broadcastDetailTitleBar(data);
            this.accountData = new Object();
            Object.assign(this.accountData, data);
            this.accountData.businessStartDate = UtilFunctions.toCbpDateFormat(this.accountData.businessStartDate);
            this.accountData.applicationDate = UtilFunctions.toCbpDateFormat(this.accountData.applicationDate);
          }
          this.stopSpinner();
        }, error => {
          this.stopSpinner();
        });
      }
    }));
  }

  stopSpinner(): void {
    this.accountService.broadcastDetailLoadingStatus(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}