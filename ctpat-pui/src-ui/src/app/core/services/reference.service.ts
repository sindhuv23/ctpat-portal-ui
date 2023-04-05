import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService implements OnDestroy  {

  baseUrl = environment.baseUrl;
  refUrl = environment.refBaseUrl;
  private subscriptions = new Subscription();

  private countryList: any;
  private countryMap = new Map<string, string>();
  private stateList: any;
  private stateMap = new Map<string, string>();

  private esCenterList: any;
  private esCenterMap = new Map<string, string>();

  private borderCrossingList: any;
  private borderCrossingMap = new Map<string, string>();
  private driverSourceList: any;
  private driverSourceMap = new Map<string, string>();
  private serviceOfferedList: any;
  private serviceOfferedMap = new Map<string, string>();

  constructor(private httpClient: HttpClient) {
    this.retreivedRefData();
  }

  public retreivedRefData(): void{
    this.retrieveCountryList();
    this.retrieveStateList();
    this.retrieveEsCenterList();

    this.retrieveBorderCrossingList();
    this.retrieveDriverSourceList();
    this.retrieveServiceOfferedList();
  }

  private retrieveCountryList(): void{
    if (!this.countryList || this.countryList.length === 0){
      this.subscriptions.add(this.httpClient.get(this.baseUrl + '/service-portal/getCountryList').subscribe(data =>
        { this.countryList = data;
          this.buildCountryMap();
        }));
    }
  }

  private retrieveStateList(): void{
    if (!this.stateList || this.stateList.length === 0){
      this.subscriptions.add(this.httpClient.get(this.baseUrl + '/service-portal/getStateList').subscribe(data =>
        { this.stateList = data;
          this.buildStateMap();
        }));
    }
  }

  private retrieveEsCenterList(): void{
    if (!this.esCenterList || this.esCenterList.length === 0){
      this.subscriptions.add(this.httpClient.get(this.refUrl + '/api/getEsCenterList').subscribe(data =>
        { this.esCenterList = data;
          this.buildEsCenterMap();
        }));
    }
  }

  private retrieveBorderCrossingList(): void{
    if (!this.borderCrossingList || this.borderCrossingList.length === 0){
      this.subscriptions.add(this.httpClient.get(this.baseUrl + '/service-portal/bei/getRfBorderCrossingList').subscribe(data =>
        { this.borderCrossingList = data;
          this.buildBorderCrossingMap();
        }));
    }
  }

  private retrieveDriverSourceList(): void{
    if (!this.driverSourceList || this.driverSourceList.length === 0){
      this.subscriptions.add(this.httpClient.get(this.baseUrl + '/service-portal/bei/getRfDriverSourceList').subscribe(data =>
        { this.driverSourceList = data;
          this.buildDriverSourceMap();
        }));
    }
  }

  private retrieveServiceOfferedList(): void{
    if (!this.serviceOfferedList || this.serviceOfferedList.length === 0){
      this.subscriptions.add(this.httpClient.get(this.baseUrl + '/service-portal/bei/getRfServiceOfferedList').subscribe(data =>
        { this.serviceOfferedList = data;
          this.buildServiceOfferedMap();
        }));
    }
  }

  private buildCountryMap(): void{
    this.countryList.forEach((element: any) => {
      this.countryMap.set(element.id.toString(), element.countryName);
    });
  }

  private buildStateMap(): void{
    this.stateList.forEach((element: any) => {
      this.stateMap.set(element.id.toString(), element.stateName);
    });
  }

  private buildEsCenterMap(): void{
    this.esCenterList.forEach((element: any) => {
      this.esCenterMap.set(element.centerId, element.descriptionText);
    });
  }

  private buildBorderCrossingMap(): void{
    this.borderCrossingList.forEach((element: any) => {
      this.borderCrossingMap.set(element.id, element.border_crossing_description);
    });
  }

  private buildDriverSourceMap(): void{
    this.driverSourceList.forEach((element: any) => {
      this.driverSourceMap.set(element.id, element.driver_source_description);
    });
  }

  private buildServiceOfferedMap(): void{
    this.serviceOfferedList.forEach((element: any) => {
      this.serviceOfferedMap.set(element.id, element.service_offered_description);
    });
  }

  public getCountryName(id: string): string{
    const countryName = this.countryMap.get(id);
    return countryName ? countryName : id;
  }

  public getStateName(id: string): string{
    const stateName = this.stateMap.get(id);
    return stateName ? stateName : id;
  }

  public getEsCenterName(centerId: string): string{
    const esCenterName = this.esCenterMap.get(centerId);
    return esCenterName ? esCenterName : centerId;
  }

  public getEsCenterList(): any{
    return this.esCenterList;
  }

  public getBorderCrossingName(id: string): string{
    const borderCrossingName = this.borderCrossingMap.get(id);
    return borderCrossingName ? borderCrossingName : id;
  }

  public getBorderCrossingList(): any{
    return this.borderCrossingList;
  }

  public getDriverSourceName(id: string): string{
    const driverSourceName = this.driverSourceMap.get(id);
    return driverSourceName ? driverSourceName : id;
  }

  public getDriverSourceList(): any{
    return this.driverSourceList;
  }

  public getServiceOfferedName(id: string): string{
    const serviceOfferedName = this.serviceOfferedMap.get(id);
    return serviceOfferedName ? serviceOfferedName : id;
  }

  public getServiceOfferedList(): any{
    return this.serviceOfferedList;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
