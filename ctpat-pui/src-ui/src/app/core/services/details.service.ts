import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
providedIn: 'root'
})
export class DetailsService {
    baseUrl = environment.baseUrl;

    constructor(private httpClient: HttpClient) {
    }

    public getTradeComplianceAccount(id: String): Observable<any>{
      return this.httpClient.post(this.baseUrl + '/tradeComplianceAccount', id );
    }

}