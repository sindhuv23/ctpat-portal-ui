import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddCountryOfOriginModalComponent } from 'src/app/core/modals/create-bei-modal/add-country-of-origin-modal/add-country-of-origin-modal.component';
import { EditCountryOfOriginModalComponent } from 'src/app/core/modals/create-bei-modal/edit-country-of-origin-modal/edit-country-of-origin-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-country-of-origin',
  templateUrl: './country-of-origin.component.html',
  styleUrls: ['./country-of-origin.component.scss']
})
export class CountryOfOriginComponent implements OnInit,  OnDestroy, AfterViewInit {

  private subscriptions = new Subscription();
  public accountId = 'id222';

  displayedColumnsCooTrade: string[] = ['percentageImports', 'countryOfOrigin', 'stateOfOrigin', 'cityOfOrigin'];
  displayedColumnsCooInternal: string[] =
  ['percentageImports', 'countryOfOrigin', 'stateOfOrigin', 'cityOfOrigin', 'suggestedIndicator', 'entryId'];
  displayedColumnsPreviousVisits: string[] = ['countryVisited', 'visitDate', 'companyName'];

  private dataCooTrade: any[] = [];
  public dataSourceCooTrade = new MatTableDataSource<any>();
  private dataCooInternal: any[] = [];
  public dataSourceCooInternal = new MatTableDataSource<any>();
  private dataPreviousVisits: any[] = [];
  public dataSourcePreviousVisits = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{ // mockup data below. data populated from database
    this.dataCooTrade.push({percentageImports: 90, countryOfOrigin: 'Canada',
    stateOfOrigin: 'ON', cityOfOrigin: 'Toronto'});
    this.dataSourceCooTrade = new MatTableDataSource<any>(this.dataCooTrade);

    this.dataCooInternal.push({percentageImports: 90, countryOfOrigin: 'Canada',
      stateOfOrigin: 'ON', cityOfOrigin: 'Toronto', suggestedIndicator: 'Y', entryId: this.dataCooInternal.length});
    this.dataSourceCooInternal = new MatTableDataSource<any>(this.dataCooInternal);

    this.dataPreviousVisits.push({countryVisited: 'Canada', visitDate: '06/02/2021', companyName: 'Some Company'});
    this.dataSourcePreviousVisits = new MatTableDataSource<any>(this.dataPreviousVisits);
  }

   // open add coo modal. if new coo saved, publish form the modal and update this display section from backend.
  addCooInternal(id: any): void{
    const dialogRef = this.dialog.open(AddCountryOfOriginModalComponent, {
      data: {id},
      width: '600px',
      height: '400px',
      disableClose: true
    });
  }

  // open edit coo modal. if new coo saved, publish from the modal and update this display section from backend.
  // id for edit include account ID and country ID
  editCooInternal(id: any): void{
    const dialogRef = this.dialog.open(EditCountryOfOriginModalComponent, {
      data: {id},
      width: '600px',
      height: '400px',
      disableClose: true
    });
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
        this.deleteCooInternal(id);
      }
    });
  }

   // this method is not needed when backend is connected. retrieval of updated data deletes the record.
  deleteCooInternal(id: any): void{
    this.dataCooInternal.splice(id, 1);
    for (let i = 0; i < this.dataCooInternal.length; i++) {
     this.dataCooInternal[i].entryId = i;
    }
    this.dataSourceCooInternal = new MatTableDataSource<any>(this.dataCooInternal);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
