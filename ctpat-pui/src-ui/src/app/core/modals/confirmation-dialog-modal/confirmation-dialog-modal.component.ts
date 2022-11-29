import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-modal',
  templateUrl: './confirmation-dialog-modal.component.html',
  styleUrls: ['./confirmation-dialog-modal.component.scss']
})
export class ConfirmationDialogModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){ }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
