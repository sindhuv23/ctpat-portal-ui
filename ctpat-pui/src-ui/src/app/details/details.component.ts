import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor() { }

  ngOnInit(): void {
    this.showActionMenu = true;
    this.setActionItems();
  }

  setActionItems(): void{
    this.actionMenuItems = [{name: 'Generate PDF', action: 'viewPDF'}];
  }

  invokeMenuAction(action: string): void  {
   if (action === 'viewPdf'){
      this.viewPdf();
   }
  }

  viewPdf(): void{}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
