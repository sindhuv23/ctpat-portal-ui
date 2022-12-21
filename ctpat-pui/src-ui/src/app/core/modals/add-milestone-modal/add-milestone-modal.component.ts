import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-milestone-modal',
  templateUrl: './add-milestone-modal.component.html',
  styleUrls: ['./add-milestone-modal.component.scss']
})
export class AddMilestoneModalComponent implements OnInit {

  public milestoneForm!: FormGroup;
  public noteTypes!: any[];

  constructor(
    public dialogRef: MatDialogRef<AddMilestoneModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder){ }

  ngOnInit(): void {
    this.milestoneForm = this.formBuilder.group({
      noteType: new FormControl('', Validators.required),
      noteText: new FormControl('', Validators.required)
    });
    this.noteTypes = [];
  }

  get f(): {[key: string]: AbstractControl} {
    return this.milestoneForm.controls;
  }

  save(): void{
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }


}
