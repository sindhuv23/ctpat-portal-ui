import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiTokenService {

  private apiAuthToken = '';
  private apiAuthTokenExp?: Date;

  constructor(private http: HttpClient) {
  }

  getApiAuthToken() {
    return this.apiAuthToken;
  }
  getApiAuthTokenExp() {
    return this.apiAuthTokenExp;
  }

  invalidateToken(): void {
    this.apiAuthToken = '';
  }

  handleError(error: any): Observable<any> {
    if (error.status && error.statusText) {
      console.error(`An error occurred: ${error.status} - ${error.statusText}`);
    }
    console.error('Error from server: ', error);
    return throwError(error);
  }

  needRefreshJwt(): boolean {
   const  now = new Date(new Date().getTime() + 1000 * 300);
   const  expDate = this.apiAuthTokenExp;
   if (!expDate || now > expDate) {
      return true;
    } else {
      return false;
    }
  }

  loadApiCtpatToken(url: string): Promise<any> {
    return this.http.get(url, { withCredentials: true })
      .toPromise()
      .then((tokenresponse: any) => {
        const  now = new Date(new Date().getTime() + 1000 * 3600);
        this.apiAuthToken = tokenresponse.token;
        this.apiAuthTokenExp = now;
      }).catch((error: any) => {
        console.log('Could not get Ctpat JWT: Check ' + url);
        this.apiAuthToken = '';
        return Promise.resolve(true);
      });
  }

}
