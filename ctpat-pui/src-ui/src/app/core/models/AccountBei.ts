export class AccountBei 
{
    beiId!: number;
	eligibilityCatalogId!: number;
	eligibilityCatalogVersionNo!: number;	
	beiValue!: string;

    securityModelAccountId!: number;
    ctpatAccount!: number; //ctpataccountid
    tcActiveInd!: string;
    activeCode!: string;
    vettedApproved!: string;
    benefitTxt!: string;

    // constructor(eligibilityCatalogId: number, eligibilityCatalogVersionNo: number = 1, 
    //     beiValue: string, securityModelAccountId: number = 100213, ctpatAccount: number = 100213)
    // {
    //     //ctpataccountid is the same id with secuirtymodelaccountid
    //     this.eligibilityCatalogId = eligibilityCatalogId;
    //     this.eligibilityCatalogVersionNo = eligibilityCatalogVersionNo;
    //     this.beiValue = beiValue;
    //     this.securityModelAccountId = securityModelAccountId;
    //     this.ctpatAccount = ctpatAccount;
    // }

}