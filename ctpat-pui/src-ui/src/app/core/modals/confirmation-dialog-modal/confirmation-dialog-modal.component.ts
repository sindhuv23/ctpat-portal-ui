import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-confirmation-dialog-modal',
  templateUrl: './confirmation-dialog-modal.component.html',
  styleUrls: ['./confirmation-dialog-modal.component.scss']
})
export class ConfirmationDialogModalComponent implements OnInit {

  public confirmDeletionForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder : FormBuilder){ }

    ngOnInit(): void {
      this.confirmDeletionForm = this.formBuilder.group({
        
      });
    }

  onNoClick(): void{
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}