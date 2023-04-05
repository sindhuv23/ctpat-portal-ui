import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConfirmationDialogModalComponent } from 'src/app/core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddMilestoneModalComponent } from 'src/app/core/modals/add-milestone-modal/add-milestone-modal.component';
import { AccountService } from 'src/app/core/services/account.service';

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
  public ctpatAccountId!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(public dialog: MatDialog, public accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id) {
        this.ctpatAccountId = id;
       this.fetchMilestoneDetails();
      }
    }));
    this.subscriptions.add(this.accountService.milestoneResult$.subscribe((milestones: any) => {
      this.milestones = [];
      if (milestones) {
        milestones.forEach((milestone: any) => {
          this.milestones.push({
            noteType: milestone.noteTypeValue,
            noteText: milestone.noteText,
            createdBy: milestone.createdBy,
            createdDate: milestone.createdDate,
            entryId: milestone.id,
            noteTypeId: milestone.noteType
          });
        });
        this.dataSource = new MatTableDataSource<any>(this.milestones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      }
    }));
  }

  ngAfterViewInit(): void {

  }


fetchMilestoneDetails(){
  this.accountService.getMileStoneDets(this.ctpatAccountId).subscribe((milestones: any[]) => {
    if (milestones) {
      this.accountService.broadcastMilestoneResult(milestones);
    }
  })
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

  editMileStoneActionEntry(id: any, noteTypeId: any, noteText:any): void{
    const dialogRef = this.dialog.open(AddMilestoneModalComponent, {
      data: {id, title: "Edit Milestone", noteTypeId, noteText},
      width: '600px',
      height: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result)=> {this.fetchMilestoneDetails();});
  }

  deleteMileStoneEntry(id: any): void{

    this.accountService.deleteMilestone(id).subscribe((result : any) => {
      this.fetchMilestoneDetails();
    }
    );
    
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}