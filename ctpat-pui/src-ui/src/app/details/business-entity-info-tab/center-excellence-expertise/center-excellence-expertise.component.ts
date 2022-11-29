import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCeeModalComponent } from 'src/app/core/modals/create-bei-modal/edit-cee-modal/edit-cee-modal.component';

@Component({
  selector: 'app-center-excellence-expertise',
  templateUrl: './center-excellence-expertise.component.html',
  styleUrls: ['./center-excellence-expertise.component.scss']
})
export class CenterExcellenceExpertiseComponent implements OnInit {

  // get CEE ID for edit
  public ceeId = 222;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editCee(id: any): void{
    const dialogRef = this.dialog.open(EditCeeModalComponent, {
      data: {id},
      width: '700px',
      height: '490px',
      disableClose: true
    });
  }

}
