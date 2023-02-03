import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-site-validation-visit-modal',
  templateUrl: './site-validation-visit-modal.component.html',
  styleUrls: ['./site-validation-visit-modal.component.scss']
})
export class SiteValidationVisitModalComponent implements OnInit, OnDestroy {

  public siteValidationVisitForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  public responseId = 16532;
  constructor(public dialogRef: MatDialogRef<SiteValidationVisitModalComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.submitted = false;

      this.siteValidationVisitForm = this.formBuilder.group({

      });
    }

    public hasError = (controlName: string, errorName: string) => {
      return this.siteValidationVisitForm.controls[controlName].hasError(errorName);
    }
  
    get f(): {[key: string]: AbstractControl} {
      return this.siteValidationVisitForm.controls;
    }
  
    initiate(): void{
    }

    save(): void{
        this.dialogRef.close();
    }
  
    cancel(): void {
      this.dialogRef.close();
    }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
