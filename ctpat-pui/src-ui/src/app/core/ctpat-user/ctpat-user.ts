import { CBPUser } from '../utils/cbp.theme';

export class Authorities {
  authority = '';
}

export class Contact {
  addresses : string[] = [];
  phones: string[] = [];
}

export class CtpatUser extends CBPUser {
  userId = '';
  emailAddress = '';
  country = '';
  userName = '';
  apiAuthToken = '';
  roles: Authorities[] = [];
  agencyCode = '';
  agencyName = '';
  loginFromWebSeal = true;
  contact: Contact = new Contact();

  hasOnlyRole(expectedRole: string): boolean {
    if (this.roles.length == 1 && this.roles[0].authority === expectedRole){
      return true;
    }

    return false;
  }

  hasRole(expectedRole: string): boolean {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].authority === expectedRole) {
        return true;
      }
    }

    return false;
  }
  hasAnyRole(expectedRoles: string[]): boolean {
    let flag = false;
    expectedRoles.forEach(expectedRole => this.roles.forEach(role => {
      if (role.authority === expectedRole) {
        flag = true;
      }
    }));
    return flag;
  }

  getUserId(): string {
    return this.userId;
  }
}
