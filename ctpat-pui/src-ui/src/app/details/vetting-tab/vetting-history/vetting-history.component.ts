import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NewVettingModalComponent } from 'src/app/core/modals/new-vetting-modal/new-vetting-modal.component';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-vetting-history',
  templateUrl: './vetting-history.component.html',
  styleUrls: ['./vetting-history.component.scss']
})
export class VettingHistoryComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();
  private businessType!: string;
  private businessTypeId!: number;
  private ctpatAccountId!: string;
  displayedColumnsVettingHistory: string[] = ['vettingDate', 'scss', 'results', 'docId'];
  private dataVettingHistory: any[] = [];
  public dataSourceVettingHistory = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog, private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.detailTitleBar$.subscribe((data: any) => {
      if (data) {
        this.businessType = data.businessType;
        this.businessTypeId = data.businessTypeId;
      }
    }));

    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id) {
        this.ctpatAccountId = id;
      }
    }));
  }

  ngAfterViewInit(): void {
    this.dataVettingHistory.push({ vettingDate: '01/02/2019', scss: 'John Doe', results: 'Approved', docId: 0 });
    this.dataVettingHistory.push({ vettingDate: '03/06/2015', scss: 'Someone LastName', results: 'Declined', docId: 1 });
    this.dataSourceVettingHistory = new MatTableDataSource<any>(this.dataVettingHistory);
  }

  newVetting(): void {
    const dialogRef = this.dialog.open(NewVettingModalComponent, {
      data: { businessType: this.businessType, businessTypeId: this.businessTypeId, ctpatAccountId: this.ctpatAccountId },
      width: '1000px',
      height: '1200px',
      disableClose: true
    });
  }

  getDocument(docId: any): void {
    console.log('retrieve doc for ID ' + docId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

