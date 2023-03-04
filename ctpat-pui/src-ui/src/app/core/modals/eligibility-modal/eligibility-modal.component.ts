import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eligibility-modal',
  templateUrl: './eligibility-modal.component.html',
  styleUrls: ['./eligibility-modal.component.scss']
})
export class EligibilityModalComponent implements OnInit, OnDestroy {
  isSubmitted = false;
  validAnswer = false;
  public eligibilityForm!: FormGroup;
  questionArray: any;
  private subscriptions = new Subscription();

  displayedColumnsEligibilityQuestions: string[] = ['question', 'answer'];
  private dataEligibilityQuestions: any[] = [];
  public dataSourceEligibilityQuestions = new MatTableDataSource<any>();

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.eligibilityForm = this.formBuilder.group({
      questionArray: this.formBuilder.array([])
    });
  }



  ngAfterViewInit(): void {
    let tempQuestions = ['Do you have a general authority to do business without requiring the '
    + 'approval of another person outside the United States or Canada?', 'Are you an active United States importer or Non-Resident Canadian'
    + ' importer who meets the requirements set forth in 19 CFR Part 141, including in particular, sections 141.17 and 141.18?', 
    'Do you maintain separate books and records for your United States / Canada operations, prepare separate financial statemnets, '+
    'maintain accounts for the imported goods, and are you responsible for payment of import duties and taxes?', 
    'Do you possess a valid continuous importation bond filed with CBP?', 'Are you willing to complete a Memorandum of Understanding (MOU) and Trade'
    + ' Compliance Questionaire?', 'Do you maintain an internal control system that is designed to provide'
    + ' assurance of compliance with CBP laws and regulations?', 'Do you perform annual risk assessments to identify risks to compliance'
    + ' with CBP laws and regulations?', 'Do you maintain and make appropriate adjustments to the system of internal controls?', 
    'Have you designed an annual self-testing plan in response to identified risks? Do you implement corrective action in response to errors'
    +' and internal control weaknesses disclosed by self-testing?', 'Do you maintain an audit trail from financial records to CBP declarations, or'
    + ' an alternate system that ensures accurate values are reported to CBP?', 'Do you make appropriate disclosures through a prior disclosure, '
    + 'reconciliation, post summary corrections, or a supplemental letter to CBP?', 'Are you willing to submit an Annual Notification Letter (ANL) certifying that '
    + 'you continue to meet CTPAT Trade Compliance requirements as listed in the Handbook?', 'Do you agree to notify CBP of all major organizational changes?'];

    for (var i in tempQuestions){
      this.dataEligibilityQuestions.push({
        question: tempQuestions[i],
        answer: '', entryId: i
      });
      this.questions.push(this.newQuestion(tempQuestions[i]));
    }
    
    

    //this.dataSourceEligibilityQuestions = new MatTableDataSource<any>(this.dataEligibilityQuestions);
    this.dataSourceEligibilityQuestions = new MatTableDataSource(this.questions.controls);

  }

  get questions(): FormArray {
    return this.eligibilityForm.get("questionArray") as FormArray
  } 

  validateAnswer(control: FormControl){
    return control.value == "N" ? {
      validateAnswer: {
        valid: false
      }
    } : null;
  }

  newQuestion(question: string): FormGroup {
    return this.formBuilder.group({
      question: [question],
      answer: ['', [Validators.required, this.validateAnswer]]
    })
  }

  validAnswerCheck(): boolean{
    var valid = true;
    Object.keys(this.questions.controls).forEach(key => {
      if( this.questions.get(key)!.get("answer")!.errors?.validateAnswer){
        valid = false;
      }
    });
    return valid;
  }

  

  onSubmit() {
    console.log(this.eligibilityForm);
    this.validAnswer = this.validAnswerCheck();
    this.isSubmitted = true;
    // if (!this.eligibilityForm.valid) {
    //   return false;
    // } else {
    //   return alert(JSON.stringify(this.eligibilityForm.value));
    // }
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

