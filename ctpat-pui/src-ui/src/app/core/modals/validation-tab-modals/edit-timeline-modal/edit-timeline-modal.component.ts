import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-timeline-modal',
  templateUrl: './edit-timeline-modal.component.html',
  styleUrls: ['./edit-timeline-modal.component.scss']
})
export class EditTimelineModalComponent implements OnInit, OnDestroy {

  public editTimelineForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<EditTimelineModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;

    this.editTimelineForm = this.formBuilder.group({
      initiatedDate: new FormControl('', Validators.required),
      domesticVerificationDate: new FormControl(''),
      foreignVerificationDate: new FormControl(''),
      closeoutDate: new FormControl(''),
      canadianImporterIndicator: new FormControl(''),
      submittedToSupervisorDate: new FormControl(''),
      escalatedToHqDate: new FormControl(''),
      approvedDate: new FormControl(''),
      completionDate: new FormControl(''),
      initialSubmissionDate: new FormControl(''),
      subsequentRejectionDate: new FormControl(''),
      subsequentSubmissionDate: new FormControl(''),
      approvalDate: new FormControl('')
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editTimelineForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.editTimelineForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.editTimelineForm.invalid){
      return;
    }

    console.log('other validations then save');
  }

  validateDate(controlName: string, dateInput: any): void {
    const hasDateInput = dateInput && dateInput.trim();
    const dateControl = this.editTimelineForm.get(controlName);

    if (dateControl){
      if (hasDateInput) {
        // check date format error for manual inputs
        dateControl.setValidators([Validators.required]);
      } else {
        dateControl.clearValidators();
      }
      dateControl.updateValueAndValidity();
    }
  }

  toFullDate(autoCompleteInput: string, dateInput: string): any {
    if (!autoCompleteInput && !dateInput) {
      return null;
    } else if (!autoCompleteInput) {
      return dateInput;
    }

    const date = new Date(autoCompleteInput);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


