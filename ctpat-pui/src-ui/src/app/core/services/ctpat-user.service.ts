import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { CtpatUser, Contact } from 'src/app/core/ctpat-user/ctpat-user';
import { environment } from '../../../environments/environment';
import { CBPUserService } from '../utils/cbp.theme';
import { CtpatConstants } from '../utils/ctpat.const';

@Injectable({
    providedIn: 'root'
})

export class CtpatUserService extends CBPUserService {

    private subject = new ReplaySubject<CtpatUser>(1);
    private localEntitlementUser: any;
    private localCbpContact: any;
    baseUrl = environment.baseUrl;

    private subscriptions = new Subscription();

    constructor(private httpClient: HttpClient) {
        super();
    }

    getUser(): any {
        return this.subject;
    }

    getCachedUserInfo(): any {
        return this.localEntitlementUser;
    }

    getCachedUCbpContact(): any{
        return this.localCbpContact;
    }

    loadUserInfo(): Promise<any> {
      const url = CtpatConstants.APP_CONTEXT + 'api/user';
      return this.httpClient.get(url)
          .toPromise()
          .then((data: any) => {
              this.localEntitlementUser = data.entitlementUser;
              const user = new CtpatUser();
              user.firstName = data.entitlementUser.firstName;
              user.lastName = data.entitlementUser.lastName;
              user.userId = data.entitlementUser.userId;
              user.roles = data.entitlementUser.authorities;
              user.contact = data.entitlementUser.contact;
              user.emailAddress = data.entitlementUser.email;
              user.country = data.entitlementUser.country;
              user.loginFromWebSeal = data.entitlementUser.loginFromWebSeal;
              this.subject.next(user);
              this.localEntitlementUser = user;
              if (!user.loginFromWebSeal){
                this.constructCbpContact();
              }

             // localStorage.setItem('user', JSON.stringify(user));
          })
          .catch((error: any) => {
            if (environment.envName.match(/^(local|dev|sat)$/)) {
              const user = new CtpatUser();
              user.firstName = 'T\'Struck';
              user.lastName = 'Developer';
              user.userId = '';
              user.roles = [
                //  { authority: 'ROLE_OBJ_CTPAT_EDIT_USER' },
                 { authority: 'OBJ_CTPAT2_READONLY' },
                 { authority: 'OBJ_CTPAT_READONLY' },
                //  { authority: 'ROLE_OBJ_CTPAT_READONLY' },
               //   { authority: 'ROLE_OBJ_CBP_TRADE_USER' }
              ];
              user.emailAddress = 'Test@cbp.dhs.gov';
              user.country = 'US';
              user.apiAuthToken = 'localTestToken';
              const testContact = new Contact();
              testContact.addresses = ['22001 TEST County Pkwy Ashburn VA 20147'];
              testContact.phones = ['+17031231234', '+15711241234'];
              user.contact = testContact;
              user.loginFromWebSeal = false;
              this.localEntitlementUser = user;
              if (!user.loginFromWebSeal){
                this.constructCbpContact();
              }
              this.subject.next(user);
            }

            if (environment.envName !== 'local'){
              console.error('Could not load user info on startup: ');
            }
            return Promise.resolve(true);
          });
    }


    constructCbpContact(){
        this.localCbpContact = new Object();
        this.localCbpContact.fullNm = this.localEntitlementUser.firstName + ' ' + this.localEntitlementUser.lastName;
        const addressStr = this.localEntitlementUser.contact.addresses &&
        this.localEntitlementUser.contact.addresses.length > 0 ? this.localEntitlementUser.contact.addresses[0] : '';
        if (addressStr !== ''){
            const x = addressStr.split(' ');
            this.localCbpContact.str1Nm =  addressStr;
            this.localCbpContact.str2Nm = '';
            this.localCbpContact.cityNm = x[x.length - 3];
            this.localCbpContact.addrRegnCd = x[x.length - 2];
            this.localCbpContact.zipCd = x[x.length - 1];
        }else{
            this.localCbpContact.str1Nm =  '';
            this.localCbpContact.str2Nm = '';
            this.localCbpContact.cityNm = '';
            this.localCbpContact.addrRegnCd = '';
            this.localCbpContact.zipCd = '' ;
        }

    }

    login(delay = 3000): any {
        return this.subject;
    }

    logout(): void {
        const errorMsg = 'You are about to leave Ctpat site. To end the session, please close browser window.';
        window.alert(errorMsg);
        localStorage.setItem('user', '');
        window.location.href = 'https://ace.cbp.dhs.gov';
    }

}
