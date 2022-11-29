import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CtpatConstants } from '../utils/ctpat.const';

@Injectable({
    providedIn: 'root'
})

export class CtpatEnvService {
    constructor(private httpClient: HttpClient) {
    }

    loadBaserUrl(): Promise<any> {
        const url = CtpatConstants.APP_CONTEXT + 'api/hostUrl'

        return this.httpClient.get(url)
        .toPromise()
        .then((data: any) => {
            if (environment.envName != 'local'){
                environment.baseUrl=data.ctpatHostUrl+environment.baseUrl;
              }

        })
        .catch((error: any) => {
            return Promise.resolve(true);
        });
    }

}
