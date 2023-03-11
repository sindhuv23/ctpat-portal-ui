import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountService } from '../core/services/account.service';
import { UtilFunctions } from '../core/utils/ctpat.function';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  private subscriptions = new Subscription();
  public isLoading = false;

  private dataAccountList: any[] = [];
  public dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['ctpatAccountId', 'companyName', 'doingBusinessAs', 'businessType', 'ctpatStatus', 'subStatus',
                                'vettingStatus', 'harmonizationStatus', 'certificationDate', 'lastValidationDate', 'fieldOffice', 'assignedScss'];

  public isSearchResultLoading = false;
  public showNoRecordMessage = false;
  public filterText = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.searchResult$.subscribe((data: any) => {
      data.forEach((record: any) => {
        // record.submittedDate = UtilFunctions.toCbpDateFormat(record.submittedDate);
      });

      this.dataAccountList = data;
      this.dataSource = new MatTableDataSource<any>(this.dataAccountList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      this.dataSource.filter = '';
      this.filterText = '';
      this.showNoRecordMessage = true;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      if (data && data.length === 1){
        this.showDetails(data[0].ctpatAccountId);
      }
    }));

    this.subscriptions.add(this.accountService.searchStatus$.subscribe((status: boolean) => {
      this.isSearchResultLoading = status;
    }));

  }

  showDetails(ctpatAccountId: number): void{
    this.accountService.broadcastDetailLoadingStatus(true);
    this.accountService.broadcastAccountId(ctpatAccountId);
  }

  applyFilter(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let filterValue = element.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

