import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  refBaseUrl = environment.refBaseUrl;
  baseUrl = environment.baseUrl;

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

  private fieldOfficesSubject = new ReplaySubject<any>(1);
  public fieldOffices$ = this.fieldOfficesSubject.asObservable();

  private businessTypeIdSubject = new ReplaySubject<any>(1);
  public businessTypeId$ = this.businessTypeIdSubject.asObservable();

  private profileIndicatorBeiSubject = new ReplaySubject<any>(1);
  public profileIndicatorBei$ = this.profileIndicatorBeiSubject.asObservable();

  private profileIndicatorTransportSubject = new ReplaySubject<any>(1);
  public profileIndicatorTransport$ = this.profileIndicatorTransportSubject.asObservable();

  private profileIndicatorCeeSubject = new ReplaySubject<any>(1);
  public profileIndicatorCee$ = this.profileIndicatorCeeSubject.asObservable();

  private profileIndicatorHwyCarrierSubject = new ReplaySubject<any>(1);
  public profileIndicatorHwyCarrier$ = this.profileIndicatorHwyCarrierSubject.asObservable();

  private profileIndicatorCoSubject = new ReplaySubject<any>(1);
  public profileIndicatorCo$ = this.profileIndicatorCoSubject.asObservable();

  private milestoneResultSubject = new Subject<string>();
  public milestoneResult$ = this.milestoneResultSubject.asObservable();

  private ctpatContactSubject = new ReplaySubject<any>(1);
  public ctpatContact$ = this.ctpatContactSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  getRefData(refType: string): Observable<any> {
    return this.httpClient.get(this.refBaseUrl + `/api/${refType}`) ;
  }

  getAccountData(refType: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/${refType}`) ;
  }


  getRfEligibilityByBusinessId(id: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/getRfEligibilityCatalogList/${id}`) ;
  }

  saveAccountData(ctpatAccount: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/createOrUpdateCtpatAccount`, ctpatAccount) ;
  }

  createTcAccount(tcAccount: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/tradeComplianceAccount/createTradeComplianceAccount`, tcAccount) ;
  }

  saveAccountAddress(ctpatAccountAddress: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/createOrUpdateCtpatAccountAddress`, ctpatAccountAddress) ;
  }

  deleteAccountAddress(id: any): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/service-portal/deleteCtpatAccountAddress/${id}`) ;
  }

  getCtpatAccountAddress(ctpatAccountId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/getCtpatAccountAddress/${ctpatAccountId}`) ;
  }

  updateCtpatAccountTcInd(ctpatAccount: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/updateCtpatAccountTcInd`, ctpatAccount) ;
  }

  getAccountDetails(ctpatAccountId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/getCtpatAccount/${ctpatAccountId}`) ;
  }

  updateAddressPrimaryInd(ctpatAccountId : any, id: any): Observable<any> {
       return this.httpClient.get(this.baseUrl + `/service-portal/updateAddressPrimaryInd/${ctpatAccountId}/${id}`);
  }

  updateUsersPrimaryInd(ctpatAccountId : any, id : any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/updateUsersPrimaryInd/${ctpatAccountId}/${id}`);
  }

  getEligibilityQuestionsByBusinessTypeId(businessTypeId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/getEligibilityQuestionsByBusinessTypeId/${businessTypeId}`);
  }

  getEligibilityQuestionsByBusinessTypeIdAndSubject(queryModel: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/getEligibilityQuestionsByBusinessTypeIdAndSubject/`, queryModel);
  }

public getTcAccountContactsByCtpatId(ctpatAccountId: any): Observable<any> {
    return this.httpClient.get(environment.tcBaseUrl + '/getTcAccountContactsByCtpatId/' + ctpatAccountId);
  }

public deleteCtpatAccountUser(id:any, ctpatAccountId: any): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/service-portal/deleteCtpatAccountUser/${id}/${ctpatAccountId}`);
  }

  public getMilestoneTypes(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/getPageOfOrigins`) ;
  }

  public saveMilestone(notes : any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/saveMilestone`, notes) ;
  }

  public getMileStoneDets(id: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/service-portal/getMilestoneDetails/${id}`) ;
  }

  public deleteMilestone(id: any): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/service-portal/deleteMilestone/${id}`) ;
  }


  public broadcastDetailLoadingStatus(detailLoadingStatus: any): void{
    this.detailLoadingStatusSubject.next(detailLoadingStatus);
  }

  public broadcastAccountId(id: number): void{
    this.acountIdSubject.next(id);
  }

  public broadcastBusinessTypeId(id: number): void{
    this.businessTypeIdSubject.next(id);
  }

  public broadcastDetailTitleBar(data: any): void{
    this.detailTitleBarSubject.next(data);
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

  public broadcastFieldOffices(data: any): void{
    this.fieldOfficesSubject.next(data);
  }

  public broadcastProfileIndicatorBei(data: boolean): void{
    this.profileIndicatorBeiSubject.next(data);
  }

  public broadcastProfileIndicatorTransport(data: boolean): void{
    this.profileIndicatorTransportSubject.next(data);
  }

  public broadcastProfileIndicatorCee(data: boolean): void{
    this.profileIndicatorCeeSubject.next(data);
  }

  public broadcastProfileIndicatorHwyCarrier(data: boolean): void{
    this.profileIndicatorHwyCarrierSubject.next(data);
  }

  public broadcastProfileIndicatorCo(data: boolean): void{
    this.profileIndicatorCoSubject.next(data);
  }

  public broadcastMilestoneResult(milestoneResult: any): void{
    this.milestoneResultSubject.next(milestoneResult);
  }

  public refreshCtpatContact(data: any): void{
    this.ctpatContactSubject.next(data);
  }

}
