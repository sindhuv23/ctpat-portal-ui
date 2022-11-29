import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
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
      // beiType: new FormControl('', Validators.required),
      // beiValue: new FormControl('', Validators.required)
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

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


