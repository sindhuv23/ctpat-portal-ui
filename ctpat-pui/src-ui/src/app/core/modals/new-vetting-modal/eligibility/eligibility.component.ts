import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityComponent implements OnInit, OnDestroy, AfterViewInit {

  public eligibilityForm!: FormGroup;

  private subscriptions = new Subscription();

  displayedColumnsEligibilityQuestions: string[] = ['question', 'answer'];
  private dataEligibilityQuestions: any[] = [];
  public dataSourceEligibilityQuestions = new MatTableDataSource<any>();

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.eligibilityForm = this.formBuilder.group({
      eligibilityNotes: new FormControl('')
    });
  }

  ngAfterViewInit(): void{
    this.dataEligibilityQuestions.push({question: 'Is an active U.S. importer or Non-Resident Canadian Importer into the United States?',
    answer: '', entryId: 0});
    this.dataEligibilityQuestions.push({question: 'Has a designated company officer that will be the primary cargo security officer been responsible for CTPAT?',
    answer: '', entryId: 1});
    this.dataEligibilityQuestions.push({question: 'Possesses a valid continuous import bond registered with CBP (for all IOR numbers listed in the account)?',
    answer: '', entryId: 2});
    this.dataEligibilityQuestions.push({question: 'Has a signed the "CTPAT-Partner Agreement to Voluntarily Participate" and demonstrate commitment to '
    + 'the obligations outlined in this Agreement. Is it signed by a Company Officer?',
    answer: '', entryId: 3});
    this.dataEligibilityQuestions.push({question: 'Is an active U.S. importer of record ID in either of the following formats: U.S. Social Security Number, '
    + 'U.S. Internal Revenue Service assigned ID(s), or CBP assigned Importer ID?',
    answer: '', entryId: 4});
    this.dataEligibilityQuestions.push({question: 'Has no evidence of financial debt to CBP for which the responsible party has exhausted all administrative '
    + 'disposition has been rendered, and the final bill or debt remains unpaid at the time of the initial application or annual renewal. '
    + 'Click on "Debt to CBP" located on CTPAT SharePoint.',
    answer: '', entryId: 5});
    this.dataEligibilityQuestions.push({question: 'Has completed a Security Profile within the CTPAT Portal, identifying how the company meets '
    + 'and maintains the Program\'s MSC for U.S. Importers.',
    answer: '', entryId: 6});

    this.dataSourceEligibilityQuestions = new MatTableDataSource<any>(this.dataEligibilityQuestions);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


