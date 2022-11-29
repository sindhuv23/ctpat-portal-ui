import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PlanValidationModalComponent } from 'src/app/core/modals/plan-validation-modal/plan-validation-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { ValidationService } from 'src/app/core/services/validation.service';
import { PlanValidationWithVisitModalComponent } from 'src/app/core/modals/validation-tab-modals/plan-validation-with-visit-modal/plan-validation-with-visit-modal.component';
import { PlanValidationWithNoVisitModalComponent } from 'src/app/core/modals/validation-tab-modals/plan-validation-with-no-visit-modal/plan-validation-with-no-visit-modal.component';

@Component({
  selector: 'app-validation-summary',
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.scss']
})
export class ValidationSummaryComponent

implements OnInit, OnDestroy, AfterViewInit {

 private subscriptions = new Subscription();
 public showDetails = false;

 displayedColumnsValidationSummary: string[] =
  ['validationType', 'validationStatus', 'validationInitiatedDate', 'closeOutDate', 'reportStatus', 'sentToPartner',
  'responseStatus', 'responseAcceptedDate', 'responseSummary', 'validationReport', 'executiveSummary', 'worksheetSummary', 'entryId'];
  private dataValidationSummary: any[] = [];
  public dataSourceValidationSummary = new MatTableDataSource<any>();

 constructor(public dialog: MatDialog, public validationService: ValidationService) { }

 ngOnInit(): void {
 }

 eventFunction(id: any): void{
  console.log('row clicked -> ' + id);
 }

 showValidationDetails(id: any): void{
  this.showDetails = true;
  this.validationService.broadcastValidationId(id);
 }

 planValidationVisit(): void{
  const dialogRef = this.dialog.open(PlanValidationWithVisitModalComponent, {
    data: {},
    width: '600px',
    height: '230px',
    disableClose: true
  });
}

planValidationNoVisit(): void{
  const dialogRef = this.dialog.open(PlanValidationWithNoVisitModalComponent, {
    data: {},
    width: '800px',
    height: '600px',
    disableClose: true
  });
}

 ngAfterViewInit(): void{
  this.dataValidationSummary.push({validationType: 'Initial Validation', validationStatus: 'Initiated', validationInitiatedDate: '10/03/2022', closeOutDate: '', reportStatus: '', sentToPartner: '',
    responseStatus: '', responseAcceptedDate: '', responseSummary: '', validationReport: '', executiveSummary: 'Edit',
    worksheetSummary: 'Summary', entryId: this.dataValidationSummary.length});
  this.dataValidationSummary.push({validationType: 'Not Visiting', validationStatus: 'Rejected', validationInitiatedDate: '09/03/2020',
    closeOutDate: '10/10/2020', reportStatus: 'N/A', sentToPartner: 'N/A', responseStatus: 'N/A', responseAcceptedDate: 'N/A',
    responseSummary: 'N/A', validationReport: 'N/A', executiveSummary: 'N/A', worksheetSummary: '',
    entryId: this.dataValidationSummary.length});
  this.dataSourceValidationSummary = new MatTableDataSource<any>(this.dataValidationSummary);
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
    confirmRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteValidationSummary(id);
      }
    });
  }

   // this method is not needed when backend is connected. retrieval of updated data deletes the record.
  deleteValidationSummary(id: any): void{
    this.dataValidationSummary.splice(id, 1);
    for (let i = 0; i < this.dataValidationSummary.length; i++) {
     this.dataValidationSummary[i].entryId = i;
    }
    this.dataSourceValidationSummary = new MatTableDataSource<any>(this.dataValidationSummary);
  }

 ngOnDestroy(): void {
   this.subscriptions.unsubscribe();
 }
}
