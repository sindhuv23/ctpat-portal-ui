import { Injectable, ɵisObservable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TradeUser, Salutation } from '../utils/cbp.theme';
import  {Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BusinessDetailsService  {
    
    baseUrl = environment.baseUrl;

    getAccountData(refType: string): Observable<any> {
        return this.http.get(this.baseUrl + `/service-portal/${refType}`) ;
      }

      

    
    private businessContact!  : TradeUser;
    private salutations! : Salutation[];
    constructor(private http: HttpClient) {

    }

    getUserDetsByEmail(email: string)  {
      return  this.http.get<TradeUser>(this.baseUrl + `/service-portal/getBusinessContactDetails?email=${email}`).toPromise();
    }

    getExistingCompanyNames() : Observable<any> {
      return this.http.get(this.baseUrl + `/service-portal/getExistingCompanyNames`) ;
    }
      saveOrUpdateUserDets(tradeUser: any): Observable<any> {
        return this.http.post(this.baseUrl + `/service-portal/saveBusinessContactDetails`, tradeUser) ;
      }
    
      getCompanyInfo(consultantId : number) {
         return  this.
         http.
         get<TradeUser>(this.baseUrl + '/service-portal/getCompanyInfo?consultantId='+consultantId+'').toPromise();
       
      }

}