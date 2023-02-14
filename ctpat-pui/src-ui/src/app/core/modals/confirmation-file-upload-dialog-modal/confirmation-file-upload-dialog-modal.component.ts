import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-file-upload-dialog-modal',
  templateUrl: './confirmation-file-upload-dialog-modal.component.html',
  styleUrls: ['./confirmation-file-upload-dialog-modal.component.scss']
})
export class ConfirmationFileUploadDialogModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationFileUploadDialogModalComponent>) { }


  ngOnInit(): void {

  }

  no(): void {
    this.dialogRef.close('No');
  }

  yes(): void {
    this.dialogRef.close('Yes');
  }

}
