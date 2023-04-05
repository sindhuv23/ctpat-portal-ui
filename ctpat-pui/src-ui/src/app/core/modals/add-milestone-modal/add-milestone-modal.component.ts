import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-milestone-modal',
  templateUrl: './add-milestone-modal.component.html',
  styleUrls: ['./add-milestone-modal.component.scss']
})
export class AddMilestoneModalComponent implements OnInit {

  public milestoneForm!: FormGroup;
  public noteTypes!: Observable<any>;
  public title!: any;
  public submitted = false;
  public id!: any;
  public noteType!: any;
  public noteText!: any;
  public ctpatAccountId!: any;
  private subscriptions = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<AddMilestoneModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    public accountService: AccountService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.title = this.data.title;
    this.id = this.data.id;
    this.noteType = this.data.noteTypeId;
    this.noteText = this.data.noteText;

    this.subscriptions.add(this.accountService.accountId$.subscribe((id: any) => {
      if (id) {
        this.ctpatAccountId = id;
      }
    }));

    this.milestoneForm = this.formBuilder.group({
      noteType: new FormControl('', Validators.required),
      noteText: new FormControl('', Validators.required),
      id: new FormControl(''),
      ctpatAccountId: new FormControl('')
    });
    this.noteTypes = this.accountService.getMilestoneTypes();
    this.milestoneForm.controls['ctpatAccountId'].setValue(this.ctpatAccountId);

    if (this.id === null || this.id === undefined) {
      this.milestoneForm.controls['noteType'].setValue('');
      this.milestoneForm.controls['noteText'].setValue('');
    } else {
      this.milestoneForm.controls['noteType'].setValue(this.noteType);
      this.milestoneForm.controls['noteType'].disable();
      this.milestoneForm.controls['noteText'].setValue(this.noteText);
      this.milestoneForm.controls['id'].setValue(this.id);

    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.milestoneForm.controls;
  }

  save(): void {

    this.submitted = true;
    this.milestoneForm.markAllAsTouched();
    if (this.milestoneForm.invalid) {
      return;
    }

    this.accountService.saveMilestone(this.milestoneForm.getRawValue()).subscribe(res => {
      this.dialogRef.close();

    });

  }

  cancel(): void {
    this.dialogRef.close();
  }


}