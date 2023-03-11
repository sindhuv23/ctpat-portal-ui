import { Injectable, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * CBPUser class can be extended by the library users to include additional attributes.
 */
@Injectable({
  providedIn: 'root'
})

export class CBPUser {
    firstName: string | undefined;
    lastName: string | undefined;
    userId: string | undefined;
    preferences: any;
}

export class TradeUser {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  title: string | undefined;
  phoneNumber: string | undefined;
  contactType: string | undefined;
  middleNameInitial: string | undefined;
  salutationId: number | undefined;
  receiveCtpatEmailInd : string | undefined;
  receiveTcEmailInd : string | undefined;
  addressLine1 : string | undefined;
	addressLine2 : string | undefined;
	cityName : string | undefined;
	stateId: number | undefined;
	countryId: number | undefined;
	consultantBusinessId: number | undefined;
	consultantCompanyName : string | undefined;
  existingConsultantCompanyName : string | undefined;
	postalCode: string | undefined;
	tradeUserId: number | undefined;
  consultantId : number |  undefined;
  ctpatAccountId : number | undefined;
  tradeUserXRefId : number | undefined;
}

export class Salutation {
  id : string | undefined;
  description: string | undefined;
}

/**
 * The implementation is beyond the scope of this library since it involves fetching the authenticated
 *  user who is accessing your application.
 * This service must be implemented by library users or by another CF components.
 */
export abstract class CBPUserService {
    private _loginInProgress: any;
    loginInProgress: boolean | undefined;;
    /**
     * User may not loaded or since user may not be "logged in".
     * If not logged in it internally calls login()
     * @returns Subject<CBPUser>
     */
    abstract getUser(): Subject<CBPUser>;
    /**
     * Must be called to perform login when the user is not logged in.
     * @returns Subject<CBPUser>
     */
    abstract login(): Subject<CBPUser>;
    /**
     * Provide implementation for logout.
     * @returns CBPUser
     */
    abstract logout(): void;
}
//export declare const CBP_USER_SERVICE: InjectionToken<CBPUserService>;
