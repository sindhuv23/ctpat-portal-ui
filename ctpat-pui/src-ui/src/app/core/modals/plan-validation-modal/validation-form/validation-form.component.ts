import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validation.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent implements OnInit {

  public validationForm!: FormGroup;
  private ngZone!: NgZone;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  public sections: any[] = [];
  public sectionTitles: any[] = [];
  public sectionNumber: any;

  constructor(private validationService: ValidationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      documentVerified: new FormControl(''),
      observedProcess: new FormControl(''),
      descriptionOfProcess: new FormControl(''),
      other: new FormControl(''),
      finding: new FormControl(''),
      recommendation: new FormControl(''),
      action: new FormControl(''),
      seniorManagementSupport: new FormControl(''),
      businessProcessTechnology: new FormControl(''),
      documentProcess: new FormControl(''),
      cbat: new FormControl(''),
      evidenceImplementation: new FormControl('')
    });

    // all controls have to created similar to following for all questions - pending backend data structures
    for (let k = 0; k <= 50; k++){
      this.validationForm.addControl('answer' + k, new FormControl(''));
    }

    this.validationService.validationQuestions$.subscribe(data =>
      this.sections = data);

    this.validationService.validationSection$.subscribe(data =>
      this.sectionNumber = data);

    this.validationService.validationTitles$.subscribe(data =>
      this.sectionTitles = data);
  }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.validationForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.validationForm.controls;
  }

  upload(id: string): void{}
  associate(id: string): void{}
  view(id: string): void{}
  remove(id: string): void{}

  prevSection(): void{
    this.validationService.broadcastValidationSection((parseInt(this.sectionNumber, 10) + 10) % 11);
  }

  nextSection(): void{
    this.validationService.broadcastValidationSection((parseInt(this.sectionNumber, 10) + 1) % 11);
  }

}
