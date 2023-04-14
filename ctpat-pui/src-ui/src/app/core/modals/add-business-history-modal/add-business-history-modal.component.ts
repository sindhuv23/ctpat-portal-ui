import { AccountService } from 'src/app/core/services/account.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-business-history-modal',
  templateUrl: './add-business-history-modal.component.html',
  styleUrls: ['./add-business-history-modal.component.scss']
})
export class AddBusinessHistoryModalComponent implements OnInit {

  public submitted = false;
  public addBusinessHistoryForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddBusinessHistoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    const row  = this.data.row;
    this.submitted = false;
    this.addBusinessHistoryForm = this.formBuilder.group({
      entryId: new FormControl(row?.entryId),
      businessHistory: new FormControl(row?.businessHistory, Validators.required)
    });
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addBusinessHistoryForm.controls;
  }

  save(): void {
    this.submitted = true;
  }

  cancel(): void {
    this.dialogRef.close();
  }

}