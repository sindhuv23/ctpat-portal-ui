import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-confirm-set-primary-dialog',
  templateUrl: './confirm-set-primary-dialog.component.html',
  styleUrls: ['./confirm-set-primary-dialog.component.scss']
})
export class ConfirmSetPrimaryDialogComponent implements OnInit {
  
  public source! : any;
  public id! : any;
  public confirmSetPrimaryDialogForm! : FormGroup;
  constructor(public dialogRef: MatDialogRef<ConfirmSetPrimaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    public dialog : MatDialog, public accountService: AccountService) { }

    @Output() responseReceived: EventEmitter<any> = new EventEmitter(); 

  ngOnInit(): void {

    this.confirmSetPrimaryDialogForm = this.formBuilder.group({}) ;
   
  }


  continue() : void {
    this.dialogRef.close(true);
  }

  cancel() : void {
    this.dialogRef.close(false);
  }
}
