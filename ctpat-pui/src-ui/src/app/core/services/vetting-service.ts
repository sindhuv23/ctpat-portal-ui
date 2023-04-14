import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VettingService {

  refBaseUrl = environment.refBaseUrl;
  baseUrl = environment.baseUrl;



  constructor(private httpClient: HttpClient) {
  }

  saveVettingData(vetting: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/service-portal/createOrUpdateVetting`, vetting) ;
  }

}
