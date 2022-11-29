import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svi-settings-modal',
  templateUrl: './svi-settings-modal.component.html',
  styleUrls: ['./svi-settings-modal.component.scss']
})
export class SviSettingsModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SviSettingsModalComponent>, private formBuilder: FormBuilder) { }

  public sviSettingsForm!: FormGroup;

  ngOnInit(): void {

    this.sviSettingsForm = this.formBuilder.group({
      agree: new FormControl(''),
      autoAcceptRequest: new FormControl(''),
      shareMore: new FormControl('')
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close();
  }

}
