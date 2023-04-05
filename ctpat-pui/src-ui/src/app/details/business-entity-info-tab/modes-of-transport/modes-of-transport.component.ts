import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditModesTransportModalComponent } from 'src/app/core/modals/business-type-specific-modals/edit-modes-transport-modal/edit-modes-transport-modal.component';
import { AccountService } from 'src/app/core/services/account.service';
import { BeiTabService } from 'src/app/core/services/bei-tab.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-modes-of-transport',
  templateUrl: './modes-of-transport.component.html',
  styleUrls: ['./modes-of-transport.component.scss']
})
export class ModesOfTransportComponent implements OnInit, OnDestroy {

  public modesTransport = '';
  public ctpatAccountId = '';
  private subscriptions = new Subscription();
  public modesTransportData: any;

  constructor(public dialog: MatDialog, public accountService: AccountService, private beiTabService: BeiTabService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.accountId$.subscribe(aid => {
        this.ctpatAccountId = aid;

        this.beiTabService.getModesTransport(this.ctpatAccountId).subscribe(data => {
          this.modesTransportData = data;
          this.displayModes();
        });
      })
     );
  }

  displayModes(): void{
    this.modesTransport = '';
    for (const mode of this.modesTransportData){
      if (mode.consolidator_values === 'Air'){
        this.modesTransport += ' Air, ';
      } else if (mode.consolidator_values === 'Sea'){
        this.modesTransport += ' Sea, ';
      } else if (mode.consolidator_values === 'Land'){
        this.modesTransport += ' Land, ';
      }
    }
    if (this.modesTransport){
      this.accountService.broadcastProfileIndicatorTransport(true);
      this.modesTransport = this.modesTransport.slice(0, -2);
    } else {
      this.accountService.broadcastProfileIndicatorTransport(false);
    }
  }

  editModesTransport(): void{
    const dialogRef = this.dialog.open(EditModesTransportModalComponent, {
      data: {ctpatAccountId: this.ctpatAccountId,
            modesTransport: this.modesTransportData},
      width: '560px',
      height: '230px',
      disableClose: true
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
