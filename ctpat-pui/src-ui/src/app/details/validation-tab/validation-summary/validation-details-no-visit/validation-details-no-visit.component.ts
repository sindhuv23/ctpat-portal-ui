import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ValidationService } from 'src/app/core/services/validation.service';
import { Subscription } from 'rxjs';
import { SubmitToSupervisorModalComponent } from 'src/app/core/modals/validation-tab-modals/submit-to-supervisor-modal/submit-to-supervisor-modal.component';
import { EditSiteListModalComponent } from 'src/app/core/modals/validation-tab-modals/edit-site-list-modal/edit-site-list-modal.component';

@Component({
  selector: 'app-validation-details-no-visit',
  templateUrl: './validation-details-no-visit.component.html',
  styleUrls: ['./validation-details-no-visit.component.scss']
})
export class ValidationDetailsNoVisitComponent implements OnInit, OnDestroy, AfterViewInit {

  // validation ID should be from backend to identify validation. currently a mockup sequence number
  public validationId: any;
  @ViewChild('matExpansionPanel', { static: true }) matExpansionPanelElement!: MatExpansionPanel;
  private subscriptions: Subscription[] = [];

  displayedColumnsVisits: string[] =
  ['noGoZoneIndicator', 'noGoReason', 'otherReason', 'gpsCoordinates', 'address', 'percentageImports'];
  private dataVisits: any[] = [];
  public dataSourceVisits = new MatTableDataSource<any>();

  // Only the latest (TBD) record in the list of validations is allowed to be edited. Edit buttons disabled if not latest
  constructor(public dialog: MatDialog, public validationService: ValidationService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.validationService.validationId$.subscribe(data => {
      if (!data.withVisit){
        this.validationId = data.id;
        console.log('get validation for ID ' + data.id + ' and populate data for header and HTML tables');
        this.matExpansionPanelElement.open();
      }
    }));
  }

  submitToSupervisor(): void{
    const dialogRef = this.dialog.open(SubmitToSupervisorModalComponent, {
      data: {},
      width: '500px',
      height: '190px',
      disableClose: true
    });
  }

  edit(): void{
    const dialogRef = this.dialog.open(EditSiteListModalComponent, {
      data: this.dataVisits,
      width: '900px',
      height: '800px',
      disableClose: true
    });
  }

  deleteValidation(): void{
  }

  ngAfterViewInit(): void{
    this.dataVisits.push({noGoZoneIndicator: true, noGoReason: 'Budget', otherReason: '',
     gpsCoordinates: '', percentageImports: '', address: {
        state: 'VA', city: 'Alexandra', country: 'US',
        street: '123 Main St.', postalCode: '22030'
      },  entryId: this.dataVisits.length});

    this.dataVisits.push({noGoZoneIndicator: true, noGoReason: 'COVID', otherReason: '',
      gpsCoordinates: '', percentageImports: '100%', address: {
         state: 'ON', city: 'Toronto', country: 'CA',
         street: '456 Main St.', postalCode: '22A0N2'
       },  entryId: this.dataVisits.length});

    this.dataSourceVisits = new MatTableDataSource<any>(this.dataVisits);
   }

   ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
