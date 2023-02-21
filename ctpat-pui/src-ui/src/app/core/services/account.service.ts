import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl = environment.baseUrl.split('/service-portal')[0];

  constructor(private httpClient: HttpClient) {
  }

  getRefData(refType: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/ctpat-service-ref-data/api/${refType}`) ;
  }

  

}
