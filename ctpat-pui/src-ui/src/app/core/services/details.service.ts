import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
providedIn: 'root'
})
export class DetailsService {
    baseUrl = environment.baseUrl;

    private currentTabSubject = new ReplaySubject<any>(1);
    public currentTab$ = this.currentTabSubject.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    public getTradeComplianceAccount(id: String): Observable<any>{
      return this.httpClient.post(this.baseUrl + '/tradeComplianceAccount', id );
    }

    public broadcastCurrentTabIndex(currentTab: number): void{
      this.currentTabSubject.next(currentTab);
    }

}
