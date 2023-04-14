import { Input, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityComponent implements OnInit, OnDestroy {

  public eligibilityForm!: FormGroup;
  private subscriptions = new Subscription();
  @Input() businessTypeId = '';

  displayedColumnsEligibilityQuestions: string[] = ['question', 'answer'];
  private dataEligibilityQuestions: any[] = [];
  public dataSourceEligibilityQuestions = new MatTableDataSource<any>();

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private accountService: AccountService) { }

  ngOnInit(): void {
    this.eligibilityForm = this.formBuilder.group({
      eligibilityNotes: new FormControl('')
    });
    this.populateEligibilityQuestions();
  }

  populateEligibilityQuestions(){
    const queryModel ={
      businessTypeId: this.businessTypeId,
      minorSubjects : [
        "Business Type Question",
        "Partner Agreement",
        "Responsible Personnel",
        "BEI"
      ],
      majorSubject: "Eligibility"
    };
    this.accountService.getEligibilityQuestionsByBusinessTypeIdAndSubject(queryModel).subscribe((res: any[])=>{
      this.dataSourceEligibilityQuestions = new MatTableDataSource<any>(res);
    });
  }

  saveSelection(row:any, ans: string){
    row.answer = ans;
  }

  getData(): any[]{
    const records = [... this.dataSourceEligibilityQuestions.data];
    const textAnswer = this.eligibilityForm.get('eligibilityNotes')?.value;
    records.forEach(record =>{
      record.text = textAnswer;
    });
    return records;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


