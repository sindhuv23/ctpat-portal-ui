import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdvanceSearchModalComponent } from '../core/modals/advance-search-modal/advance-search-modal.component';
import { AccountService } from '../core/services/account.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  public isSearching = false;

  public searchForm = new FormGroup({
    companyName: new FormControl(''),
    ctpatAccountNumber: new FormControl(''),
    beiValue: new FormControl(''),
    tradeEmail: new FormControl('')
  });

  constructor(public dialog: MatDialog, public accountService: AccountService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  search(): void{
    const rawValues = this.searchForm.getRawValue();
    const hasCriteira = rawValues.companyName?.trim() || rawValues.ctpatAccountNumber?.trim() ||
      rawValues.beiValue?.trim() || rawValues.tradeEmail?.trim();
    if (this.searchForm.invalid || !hasCriteira){
      return;
    }
    this.isSearching = true;
    this.accountService.broadcastSearchStatus(this.isSearching);

    const searchCriteria = {companyName: rawValues.companyName?.trim(),
       ctpatAccountNumber: rawValues.ctpatAccountNumber?.trim(), beiValue: rawValues.beiValue?.trim(),
       tradeEmail: rawValues.tradeEmail?.trim()};

    this.subscriptions.add(this.accountService.getSearchResult(searchCriteria)
    .subscribe((data: any) => {
       this.accountService.broadcastSearchResult(data);
       this.isSearching = false;
       this.accountService.broadcastSearchStatus(this.isSearching);
      },
      (error: HttpErrorResponse) => {
          this.reset(error);
      }));
  }

  clear(): void {
    this.searchForm.get('companyName')?.setValue('');
    this.searchForm.get('ctpatAccountNumber')?.setValue('');
    this.searchForm.get('beiValue')?.setValue('');
    this.searchForm.get('tradeEmail')?.setValue('');
  }

  openAdvanceSearchModal(): void {
    const dialogRef = this.dialog.open(AdvanceSearchModalComponent, {
      data: {},
      width: '680px',
      height: '535px',
      disableClose: true
    });
  }

  private reset(error: HttpErrorResponse): void {
    this.isSearching = false;
    this.accountService.broadcastSearchStatus(this.isSearching);
    // add notification service to notify user error on UI.
    this.accountService.broadcastSearchResult([]);
  }
}
