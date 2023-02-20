import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBeiModalComponent } from 'src/app/core/modals/create-bei-modal/create-bei-modal.component';

@Component({
  selector: 'app-business-entity-info-tab',
  templateUrl: './business-entity-info-tab.component.html',
  styleUrls: ['./business-entity-info-tab.component.scss']
})
export class BusinessEntityInfoTabComponent implements OnInit {

  hideProfileWarning = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addBusinessEntityInfo(): void{
    const dialogRef = this.dialog.open(CreateBeiModalComponent, {
      data: {},
      width: '1200px',
      height: '900px',
      disableClose: true
    });
  }

  addMrInfo(): void{
    console.log('add MR');
  }
}
