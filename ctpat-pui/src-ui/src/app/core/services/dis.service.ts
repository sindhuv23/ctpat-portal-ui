import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AttachUtilModel } from '../models/attach-util-model';


@Injectable({
providedIn: 'root'
})
export class DisService {
    baseUrl = environment.baseUrl;

    constructor(private httpClient: HttpClient) {
    }

    public saveDisDoc(attchModel: FormData): Observable<any>{
      return this.httpClient.post(this.baseUrl + '/services/files/saveDisDoc', attchModel );
    }

    downloadFormAttach(attachmentId: string): Observable<any> {
      return this.httpClient.get(this.baseUrl + '/services/files/getDisDoc/' + attachmentId , {responseType: 'arraybuffer'}) ;
    }

    deleteFormAttachments(attachments: AttachUtilModel): any {
      return this.httpClient.post(this.baseUrl + '/services/files/deleteFormAttachments', attachments);
    }
}
