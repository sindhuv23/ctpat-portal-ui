import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddMilestoneModalComponent } from 'src/app/core/modals/add-milestone-modal/add-milestone-modal.component';


@Component({
  selector: 'app-milestone-details',
  templateUrl: './milestone-details.component.html',
  styleUrls: ['./milestone-details.component.scss']
})
export class MilestoneDetailsComponent implements OnInit, AfterViewInit {

  private subscriptions = new Subscription(); 

  displayedColumns: string[] = ['noteType', 'noteText', 'createdBy', 'createdDate', 'action'];
  private milestones: any[] = [];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.milestones.push({
      noteType: 'Validation', noteText: 'Validation related note', createdBy: 'John Doe', createdDate: new Date('10-01-2022'),
      detete: ''
    });

    this.dataSource = new MatTableDataSource<any>(this.milestones);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  confirmDeletion(id: any): void{
    const confirmRef = this.dialog.open(ConfirmationDialogModalComponent, {
      disableClose: true,
      width: '460px',
      height: '200px',
      data: {
        title: 'Please Confirm Delete Action',
        message: 'This record will be deleted and cannot be recovered. \nContinue to delete?'
      }
    });
    confirmRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMileStoneEntry(id);
      }
    });
  }

  editMileStoneActionEntry(id: any): void{
    const dialogRef = this.dialog.open(AddMilestoneModalComponent, {
      data: {id},
      width: '600px',
      height: '400px',
      disableClose: true
    });
  }
  // this method is not needed when backend is connected. retrieval of updated data deletes the record.
  deleteMileStoneEntry(id: any): void{
    this.milestones.splice(id, 1);
    for (let i = 0; i < this.milestones.length; i++) {
     this.milestones[i].entryId = i;
    }
    this.dataSource = new MatTableDataSource<any>(this.milestones);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}