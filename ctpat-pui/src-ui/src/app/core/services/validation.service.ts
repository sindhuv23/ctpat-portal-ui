import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  baseUrl = environment.baseUrl;

  private validationQuestionsSubject = new ReplaySubject<any>(1);
  public validationQuestions$ = this.validationQuestionsSubject.asObservable();

  private validationTitlesSubject = new ReplaySubject<any>(1);
  public validationTitles$ = this.validationTitlesSubject.asObservable();

  private validationSectionSubject = new ReplaySubject<any>(1);
  public validationSection$ = this.validationSectionSubject.asObservable();

  private validationIdSubject = new ReplaySubject<any>();
  public validationId$ = this.validationIdSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  public broadcastValidationQuestions(data: any): void{
    this.validationQuestionsSubject.next(data);
  }

  public broadcastValidationTitles(data: any): void{
    this.validationTitlesSubject.next(data);
  }

  public broadcastValidationSection(data: any): void{
    this.validationSectionSubject.next(data);
  }

  public broadcastValidationId(data: any): void{
    this.validationIdSubject.next(data);
  }

}
