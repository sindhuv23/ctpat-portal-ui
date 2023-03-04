import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  refBaseUrl = environment.refBaseUrl;
  baseUrl = environment.baseUrl

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

}