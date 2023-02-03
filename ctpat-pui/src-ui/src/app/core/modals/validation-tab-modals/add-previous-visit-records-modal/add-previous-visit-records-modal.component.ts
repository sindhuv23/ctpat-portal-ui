import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-previous-visit-records-modal',
  templateUrl: './add-previous-visit-records-modal.component.html',
  styleUrls: ['./add-previous-visit-records-modal.component.scss']
})
export class AddPreviousVisitRecordsModalComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();

  displayedColumns: string[] = ['select', 'visitName', 'nameAddress', 'leadScss', 'completionDate', 'country', 'status'];
  private dataVisitRecords: any[] = [];
  public dataSourceVisitRecords = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public visitRecordForm!: FormGroup;

  public selection: any;

  constructor(public dialogRef: MatDialogRef<AddPreviousVisitRecordsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.visitRecordForm = this.formBuilder.group({
      textInput: new FormControl('')
    });

    this.visitRecordForm.valueChanges.subscribe(() => {
      this.doFilter();
    });
  }

  ngOnInit(): void {
    this.selection = new SelectionModel<any>(true, []); // allow multiple selections. initialize to []
  }

  ngAfterViewInit(): void{
    this.dataVisitRecords.push({select: false, visitName: 'Apples Ltd. (Domestic)', nameAddress: 'Apples Ltd.\n123 Main St., Fairfax, VA 20030',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'United States', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Apples Ltd. (Foreign)', nameAddress: 'Apples Ltd.\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Accepted'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #3', nameAddress: 'Company #3\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #4', nameAddress: 'Company #4\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Accepted'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #5', nameAddress: 'Company #5\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #6', nameAddress: 'Company #6\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #7', nameAddress: 'Company #7\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #8', nameAddress: 'Company #8\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #9', nameAddress: 'Company #9\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #10', nameAddress: 'Company #10\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #11', nameAddress: 'Company #11\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Pending'});
    this.dataVisitRecords.push({select: false, visitName: 'Visit Name #12', nameAddress: 'Company #12\n123 Main St., Toronto, ON 2AB30',
     leadScss: 'John Doe', completionDate: '10/03/2022', country: 'Canada', status: 'Accepted'});
    this.dataSourceVisitRecords = new MatTableDataSource<any>(this.dataVisitRecords);
    this.dataSourceVisitRecords.paginator = this.paginator;
    this.addFilterPredicate();
  }

  doFilter(): void{
    const rawValues = this.visitRecordForm.getRawValue();
    const filterString = rawValues.textInput.trim().toLowerCase();
    this.dataSourceVisitRecords.filter = filterString;
  }

  addFilterPredicate(): void{
    this.dataSourceVisitRecords.filterPredicate = (dataRecord: any, filterString: any): boolean => {
        return !filterString ||
                  dataRecord.nameAddress.toLowerCase().includes(filterString);
      };
  }

  associate(): void{
    console.log('validations then save');
  }

  getSelectedRecords(): any {
    const selected: any[] = [];

    this.selection.selected.forEach((element: any) => {
      selected.push(element);
    });

    return selected;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

