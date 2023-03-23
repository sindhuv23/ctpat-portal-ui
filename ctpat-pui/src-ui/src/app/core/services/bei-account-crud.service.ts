import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

//return this.httpClient.post(this.baseUrl + `/service-portal/createOrUpdateCtpatAccount`, ctpatAccount) ;
  
@Injectable({
  providedIn: 'root'
})
export class BeiAccountCrudService {

  refBaseUrl = environment.refBaseUrl;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/service-portal/bei/getBeiList');
  }

  getAllByCtPatAccountId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/service-portal/bei/getBeiListByCtpatAccountId/${id}`);
    //return this.http.get<any[]>(`${this.baseUrl}/service-portal/bei/getBeiListByCtpatAccountId`);
  }
  

  // getById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/service-portal/getBei/${id}`);
  // }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/service-portal/bei/addBei', data);
  }

  update(data: any): Observable<any> {   
    return this.http.post<any>(
      `${this.baseUrl}/service-portal/bei/updateBei/${data.beiId}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/service-portal/bei/deleteBei/${id}`);
  }

}
