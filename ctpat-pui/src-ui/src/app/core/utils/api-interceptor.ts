import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiTokenService } from '../services/api-token.service';
import { CtpatUserService } from '../services/ctpat-user.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private interceptorUrlsSkipUser = ['/oauth_loginauth', '/oauth_login'];
    private isRefreshing = false;
    private isRefreshingCtpat = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private ctpatUserService: CtpatUserService, private apiTokenService: ApiTokenService) { }

    intercept(originalReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let httpRequest = originalReq;

        if (this.apiTokenService.getApiAuthToken()){
          if (this.apiTokenService.needRefreshJwt()){
            this.handleRefreshCtpatToken(httpRequest, next);
          }
          httpRequest = httpRequest.clone
          ({headers: httpRequest.headers.set('ctpatJwt', this.apiTokenService.getApiAuthToken())});
        }

        if (!this.shouldSkipUser(httpRequest.url)) {
          httpRequest = this.addUserToRequest(httpRequest);
       }

        return next.handle(httpRequest);
    }

    private shouldSkipUser(currUrl: string): any {
      return this.interceptorUrlsSkipUser.some(url => (currUrl.endsWith(url)));
   }


    private addUserToRequest(request: HttpRequest<any>): any {

          return request.clone({headers: request.headers.set
            ('CtpatUser', JSON.stringify(this.ctpatUserService.getCachedUserInfo() || '{}'))});

    }

    private  handleRefreshCtpatToken(request: HttpRequest<any>, next: HttpHandler): void{
      if (!this.isRefreshingCtpat) {
        this.isRefreshingCtpat = true;
        this.apiTokenService.loadApiCtpatToken(environment.baseUrl + '/authenticate');
        this.isRefreshingCtpat = false;
      }
    }

}
