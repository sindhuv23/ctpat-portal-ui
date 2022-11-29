import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svi-send-certification-email-modal',
  templateUrl: './svi-send-certification-email-modal.component.html',
  styleUrls: ['./svi-send-certification-email-modal.component.scss']
})
export class SviSendCertificationEmailModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SviSendCertificationEmailModalComponent>, private formBuilder: FormBuilder) { }

  public emailForm!: FormGroup;
  public submitted!: boolean;

  ngOnInit(): void {
    this.submitted = false;
    this.emailForm = this.formBuilder.group({
      to: new FormControl('', Validators.required),
      cc: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      emailBody: new FormControl('', Validators.required)
    });
  }

  get f(): {[key: string]: AbstractControl} {
    return this.emailForm.controls;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  sendEmail(): void {
    this.submitted = true;
    this.dialogRef.close();
  }

}
