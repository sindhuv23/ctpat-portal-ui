import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { UtilFunctions } from 'src/app/core/utils/ctpat.function';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit {

  private subscriptions = new Subscription();
  public accountData: any;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id){
        this.accountService.getAccountDetails(id).subscribe((data: any) => {
          if (data){
            this.accountService.broadcastDetailTitleBar(data.companyName, data.tcStatus, data.applicationStatus, data.anlStatus);
            this.accountData = new Object();
            Object.assign(this.accountData, data);
            this.accountData.businessStartDate = UtilFunctions.toCbpDateFormat(this.accountData.businessStartDate);
            this.accountData.applicationDate = UtilFunctions.toCbpDateFormat(this.accountData.applicationDate);
            /* this.accountData.assignedRa = this.getUserNameById(this.accountData.assignedRa);
            this.accountData.assignedNam = this.getUserNameById(this.accountData.assignedNam);
            this.accountData.assignedNamSpvr = this.getUserNameById(this.accountData.assignedNamSpvr);
            this.accountData.assignedHqOfficer = this.getUserNameById(this.accountData.assignedHqOfficer);
            this.accountData.ownershipType = this.getOwnershipTypeById(this.accountData.ownershipType); */
          }
          this.stopSpinner();
        }, error => {
          this.stopSpinner();
        });
      }
    }));
  }

  stopSpinner(): void{
    this.accountService.broadcastDetailLoadingStatus(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}