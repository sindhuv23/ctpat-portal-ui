import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  refBaseUrl = environment.refBaseUrl;
  baseUrl = environment.baseUrl

  private acountIdSubject = new ReplaySubject<any>(1);
  public accountId$ = this.acountIdSubject.asObservable();

  private detailLoadingStatusSubject = new Subject<boolean>();
  public detailLoadingStatus$ = this.detailLoadingStatusSubject.asObservable();

  private detailTitleBarSubject = new ReplaySubject<any>(1);
  public detailTitleBar$ = this.detailTitleBarSubject.asObservable();

  private searchResultSubject = new Subject<string>();
  public searchResult$ = this.searchResultSubject.asObservable();

  private searchStatusSubject = new Subject<boolean>();
  public searchStatus$ = this.searchStatusSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  getRefData(refType: string): Observable<any> {
    return this.httpClient.get(this.refBaseUrl + `/api/${refType}`) ;
  }

  getAccountData(refType: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/${refType}`) ;
  }

  saveAccountData(ctpatAccount: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/createOrUpdateCtpatAccount`, ctpatAccount) ;
  }

  createTcAccount(tcAccount: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/createTradeComplianceAccount`, tcAccount);
  }

  getAccountDetails(ctpatAccountId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/getCtpatAccount/${ctpatAccountId}`) ;
  }

  public broadcastDetailLoadingStatus(detailLoadingStatus: any): void{
    this.detailLoadingStatusSubject.next(detailLoadingStatus);
  }

  public broadcastAccountId(id: number): void{
    this.acountIdSubject.next(id);
  }

  public broadcastDetailTitleBar(companyName: string, accountStatus: string, applicationStatus: string, anlStatus: string): void{
    this.detailTitleBarSubject.next({companyName, accountStatus, applicationStatus, anlStatus});
  }

  public getSearchResult(searchCriteria: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/service-portal/portalSearch', searchCriteria);
  }

  public broadcastSearchResult(searchResult: any): void{
    this.searchResultSubject.next(searchResult);
  }

  public broadcastSearchStatus(searchStatus: any): void{
    this.searchStatusSubject.next(searchStatus);
  }
}
