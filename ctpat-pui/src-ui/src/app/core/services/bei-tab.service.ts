import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BeiTabService {

  refBaseUrl = environment.refBaseUrl;
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  saveModesTransport(modesTransport: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/service-portal/bei/updateModesTransport', modesTransport);
  }

  getModesTransport(ctpatAccountId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/service-portal/bei/getModesTransport/' + ctpatAccountId) ;
  }

  saveCee(ceeData: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/service-portal/bei/updateCee', ceeData);
  }

  getCee(ctpatAccountId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/service-portal/bei/getCee/' + ctpatAccountId) ;
  }

  saveHwyCarrier(hwyCarrierData: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/service-portal/bei/updateHwyCarrier', hwyCarrierData);
  }

  updateBusinessType(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/service-portal/bei/updateBusinessType', data) ;
  }

  getHwyCarrier(ctpatAccountId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/service-portal/bei/getHwyCarrier/' + ctpatAccountId) ;
  }

  getBeiV2(ctpatAccountId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/service-portal/bei/getBeiV2/' + ctpatAccountId) ;
  }

  deleteBeiV2(beiId: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/service-portal/bei/deleteBeiV2/' + beiId) ;
  }

}
