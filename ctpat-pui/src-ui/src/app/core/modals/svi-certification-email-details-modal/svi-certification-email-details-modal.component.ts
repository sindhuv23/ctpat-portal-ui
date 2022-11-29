import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-svi-certification-email-details-modal',
  templateUrl: './svi-certification-email-details-modal.component.html',
  styleUrls: ['./svi-certification-email-details-modal.component.scss']
})
export class SviCertificationEmailDetailsModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SviCertificationEmailDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
