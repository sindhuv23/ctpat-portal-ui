import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { ValidationService } from 'src/app/core/services/validation.service';
import { AddNewVisitModalComponent } from 'src/app/core/modals/validation-tab-modals/add-new-visit-modal/add-new-visit-modal.component';
import { ApproveRejectValidationReportModalComponent } from 'src/app/core/modals/validation-tab-modals/approve-reject-validation-report-modal/approve-reject-validation-report-modal.component';
import { AssociateMrRecordsModalComponent } from 'src/app/core/modals/validation-tab-modals/associate-mr-records-modal/associate-mr-records-modal.component';
import { EditTimelineModalComponent } from 'src/app/core/modals/validation-tab-modals/edit-timeline-modal/edit-timeline-modal.component';
import { AddPreviousVisitRecordsModalComponent } from 'src/app/core/modals/validation-tab-modals/add-previous-visit-records-modal/add-previous-visit-records-modal.component';
import { PlanValidationModalComponent } from 'src/app/core/modals/plan-validation-modal/plan-validation-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validation-details-with-visit',
  templateUrl: './validation-details-with-visit.component.html',
  styleUrls: ['./validation-details-with-visit.component.scss']
})
export class ValidationDetailsWithVisitComponent implements OnInit, OnDestroy, AfterViewInit {

  // validation ID should be from backend to identify validation. currently a mockup sequence number
  public validationId: any;
  @ViewChild('matExpansionPanel', { static: true }) matExpansionPanelElement!: MatExpansionPanel;
  private subscriptions: Subscription[] = [];

  displayedColumnsVisits: string[] =
  ['visitName', 'companyName', 'address', 'visitWorksheet', 'updatedBy', 'updatedDate', 'businessProfileWorksheet', 'entryId'];
  private dataVisits: any[] = [];
  public dataSourceVisits = new MatTableDataSource<any>();

  displayedColumnsMrRecords: string[] =
  ['nameAddress', 'accountNumber', 'status', 'certificationDate', 'associatedDate', 'entryId'];
  private dataMrRecords: any[] = [];
  public dataSourceMrRecords = new MatTableDataSource<any>();

  displayedColumnsFiles: string[] =
  ['fileName', 'size', 'uploadedBy', 'updatedDatetime'];
  private dataFiles: any[] = [];
  public dataSourceFiles = new MatTableDataSource<any>();

  displayedColumnsReportComments: string[] =
  ['dateTime', 'username', 'comment'];
  private dataReportComments: any[] = [];
  public dataSourceReportComments = new MatTableDataSource<any>();

  // Only the latest (TBD) record in the list of validations is allowed to be edited. Edit buttons disabled if not latest
  constructor(public dialog: MatDialog, public validationService: ValidationService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.validationService.validationId$.subscribe(data => {
      if (data.withVisit){
        this.validationId = data.id;
        console.log('get validation for ID ' + data.id + ' and populate data for header and HTML tables');
        this.matExpansionPanelElement.open();
      }
    }));
  }

  approveRejectValidationReport(): void{
    const dialogRef = this.dialog.open(ApproveRejectValidationReportModalComponent, {
      data: {},
      width: '600px',
      height: '370px',
      disableClose: true
    });
  }

  editTimeline(): void{
    const dialogRef = this.dialog.open(EditTimelineModalComponent, {
      data: {},
      width: '900px',
      height: '416px',
      disableClose: true
    });
  }

  addNewVisit(): void{
    const dialogRef = this.dialog.open(AddNewVisitModalComponent, {
      data: {},
      width: '900px',
      height: '800px',
      disableClose: true
    });
  }

  addPreviousVisitRecords(): void{
    const dialogRef = this.dialog.open(AddPreviousVisitRecordsModalComponent, {
      data: {},
      width: '900px',
      height: '700px',
      disableClose: true
    });
  }

  associateMrRecords(): void{
    const dialogRef = this.dialog.open(AssociateMrRecordsModalComponent, {
      data: {},
      width: '1200px',
      height: '900px',
      disableClose: true
    });
  }

  edit(): void{
    const dialogRef = this.dialog.open(PlanValidationModalComponent, {
      data: {},
      width: '95%',
      maxWidth: '95%',
      height: '95%',
      disableClose: true
    });
  }

  ngAfterViewInit(): void{
    this.dataVisits.push({visitName: 'Apples Ltd. (Domestic)', companyName: 'Apples Ltd.', address: '123 Main St., Fairfax, VA 22030\nwww.applesltd.com',
     visitWorksheet: 'Status: Not Completed', updatedBy: 'John Doe', updatedDate: '10/03/2022',
      businessProfileWorksheet: 'N/A',  entryId: this.dataVisits.length});
    this.dataVisits.push({visitName: 'Apples Ltd. (Foreign)', companyName: 'Apples Ltd. (Canada)', address: '123 Main St., British Columbia, Canada\nwww.applesltd.com',
     visitWorksheet: 'Status: Not Completed', updatedBy: 'John Doe', updatedDate: '10/03/2022',
      businessProfileWorksheet: 'Status: Not Completed',  entryId: this.dataVisits.length});
    this.dataSourceVisits = new MatTableDataSource<any>(this.dataVisits);

    this.dataMrRecords.push({nameAddress: 'Company Name - \nEuropean Union Taxation and Customs Union -\nSuite 249 2nd Floor, India Buildingwater Street\nLiverpool 2QD',
     accountNumber: 'GB404942029000', status: 'Certified', certificationDate: '01/24/2022',
     associatedDate: '01/24/2022',  entryId: this.dataMrRecords.length});
    this.dataSourceMrRecords = new MatTableDataSource<any>(this.dataMrRecords);

    this.dataFiles.push({fileName: 'Validation_Notification_Letter_47309.docx', size: '136.6 KB',
     uploadedBy: 'John Doe', updatedDatetime: '11/03/2022 12:05:00 pm'});
    this.dataFiles.push({fileName: 'Automated_Validation_Report_47309_Cover_Letter_47394503.docx', size: '19 KB',
     uploadedBy: 'John Doe', updatedDatetime: '10/03/2022 14:05:00 pm'});
    this.dataFiles.push({fileName: 'Cover_Letter_47394503.docx', size: '256.4 KB',
     uploadedBy: 'John Doe', updatedDatetime: '10/03/2022 12:05:00 pm'});
    this.dataSourceFiles = new MatTableDataSource<any>(this.dataFiles);

    this.dataReportComments.push({dateTime: '11/13/2022 12:05:00 pm', username: 'Admin User', comment: 'This is approved'});
    this.dataSourceReportComments = new MatTableDataSource<any>(this.dataReportComments);
   }

   confirmDeletion(id: any): void{
    const confirmRef = this.dialog.open(ConfirmationDialogModalComponent, {
      disableClose: true,
      width: '460px',
      data: {
        title: 'Please Confirm Delete Action',
        message: 'This record will be deleted and cannot be recovered. \nContinue to delete?'
      }
    });
    confirmRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteVisits(id);
      }
    });
  }

   // this method is not needed when backend is connected. retrieval of updated data deletes the record.
  deleteVisits(id: any): void{
    this.dataVisits.splice(id, 1);
    for (let i = 0; i < this.dataVisits.length; i++) {
     this.dataVisits[i].entryId = i;
    }
    this.dataSourceVisits = new MatTableDataSource<any>(this.dataVisits);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
