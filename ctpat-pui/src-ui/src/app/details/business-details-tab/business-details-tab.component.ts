import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBeiModalComponent } from 'src/app/core/modals/create-bei-modal/create-bei-modal.component';

@Component({
  selector: 'app-business-details-tab',
  templateUrl: './business-details-tab.component.html',
  styleUrls: ['./business-details-tab.component.scss']
})
export class BusinessDetailsTabComponent implements OnInit {

  hideProfileWarning = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addBusinessEntityInfo(): void{
    const dialogRef = this.dialog.open(CreateBeiModalComponent, {
      data: {},
      width: '1200px',
      height: '1020px',
      disableClose: true
    });
  }

  addMrInfo(): void{
    console.log('add MR');
  }

}
