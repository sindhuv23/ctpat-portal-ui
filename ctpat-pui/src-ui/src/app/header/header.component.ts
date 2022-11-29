import { Component, OnInit } from '@angular/core';
import { CtpatUserService } from '../core/services/ctpat-user.service';
import { environment } from '../../environments/environment';
import { CBPUser } from '../core/utils/cbp.theme';
import { MatMenuModule } from '@angular/material/menu';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen = false;
  isAccessDeniedPage = false;
  isLoggedOutPage = false;
  envName = environment.envName;
  appName = 'CTPAT';
  rootUrl = 'https://apps.cbp.dhs.gov';

  public accountForm = new FormGroup({
    accountName: new FormControl('')
  });

  entitlementUser: any;
  public userName = 'Logged-in User Name';

  constructor(private ctpatUserService: CtpatUserService) {
   }

  ngOnInit(): void {
    this.entitlementUser = this.ctpatUserService.getCachedUserInfo();

    this.ctpatUserService.loginInProgress = true;

    this.ctpatUserService.login().subscribe((data: CBPUser) => {
       this.ctpatUserService.loginInProgress = false;
      });
  }

  logout(): void{
    this.ctpatUserService.logout();
  }

}
