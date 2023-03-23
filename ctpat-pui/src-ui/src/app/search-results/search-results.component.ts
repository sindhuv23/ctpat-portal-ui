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
  public businessTypeList: any;
  public fieldOfficeList: any;
  public statusList: any;
  public subStatusList: any;

  displayedColumns: string[] = ['ctpatAccountId', 'companyName', 'doingBusinessAs', 'businessType', 'ctpatStatus', 'subStatus',
                                'vettingStatus', 'harmonizationStatus', 'certificationDate', 'lastValidationDate', 'fieldOffice', 'assignedScss'];

  public isSearchResultLoading = false;
  public showNoRecordMessage = false;
  public filterText = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.getAccountData('getBusinessTypeList').subscribe((data: any) => {
      this.businessTypeList = data;
    }));
    this.subscriptions.add(this.accountService.getAccountData('getFieldOffices').subscribe((data: any) => {
      this.fieldOfficeList = data;
    }));
    this.subscriptions.add(this.accountService.getAccountData('getRfStatus').subscribe((data: any) => {
      this.statusList = data;
    }));
    this.subscriptions.add(this.accountService.getAccountData('getRfSubStatus').subscribe((data: any) => {
      this.subStatusList = data;
    }));

    this.subscriptions.add(this.accountService.searchResult$.subscribe((data: any) => {
      data.forEach((record: any) => {
        record.businessTypeId = record.businessType; //need the id for bei
        record.businessType = this.getBusinessTypeById(record.businessType);
        record.fieldOffice = this.getFieldOfficeById(record.fieldOffice);
        record.ctpatStatus = this.getStatusById(record.ctpatStatus);
        record.subStatus = this.getSubStatusById(record.subStatus);
        record.certificationDate = UtilFunctions.toCbpDateFormat(record.certificationDate);
        record.lastValidationDate = UtilFunctions.toCbpDateFormat(record.lastValidationDate);
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
        this.showDetails(data[0]);
      }
    }));

    this.subscriptions.add(this.accountService.searchStatus$.subscribe((status: boolean) => {
      this.isSearchResultLoading = status;
    }));

  }

  showDetails(ctpatAccount: any): void{
    
     this.accountService.broadcastDetailLoadingStatus(true);
     this.accountService.broadcastAccountId(ctpatAccount.ctpatAccountId);
     this.accountService.broadcastBusinessTypeId(ctpatAccount.businessTypeId);
    
  }

  applyFilter(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let filterValue = element.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getBusinessTypeById(id: any): string{
    let businessType = id;
    if (this.businessTypeList){
      this.businessTypeList.forEach((typeRecord: any) => {
        if (typeRecord.id == id){
          businessType = typeRecord.businessType;
        }
      });
    }
    return businessType;
  }

  getFieldOfficeById(id: any): string{
    let officeName = id;
    if (this.fieldOfficeList){
      this.fieldOfficeList.forEach((record: any) => {
        if (record.id == id){
          officeName = record.officeName;
        }
      });
    }
    return officeName;
  }

  getStatusById(id: any): string{
    let status = id;
    if (this.statusList){
      this.statusList.forEach((record: any) => {
        if (record.id == id){
          status = record.status;
        }
      });
    }
    return status;
  }

  getSubStatusById(id: any): string{
    let subStatus = id;
    if (this.subStatusList){
      this.subStatusList.forEach((record: any) => {
        if (record.id == id){
          subStatus = record.subStatus;
        }
      });
    }
    return subStatus;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

