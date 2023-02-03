import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddMilestoneModalComponent } from '../core/modals/add-milestone-modal/add-milestone-modal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  currentTabIndex = 0;
  showActionMenu!: boolean;
  actionMenuItems: any;

  public accountName = 'Apples Ltd.';

  private subscriptions = new Subscription();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showActionMenu = true;
    this.setActionItems();
  }

  setActionItems(): void {
    this.actionMenuItems = [{ name: 'Generate PDF', action: 'viewPDF' }, { name: 'Add Milestone/Note', action: 'addMilestone' }];
  }

  invokeMenuAction(action: string): void {
    if (action === 'viewPdf') {
      this.viewPdf();
    }
    if (action === 'addMilestone') {
      this.openAddMilestoneModal();
    }
  }

  viewPdf(): void { }

  openAddMilestoneModal(): void {
    const dialogRef = this.dialog.open(AddMilestoneModalComponent, {
      data: {},
      width: '560px',
      height: '300px',
      disableClose: true
    });
   }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}