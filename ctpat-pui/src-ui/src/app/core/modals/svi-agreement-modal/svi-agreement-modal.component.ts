import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svi-agreement-modal',
  templateUrl: './svi-agreement-modal.component.html',
  styleUrls: ['./svi-agreement-modal.component.scss']
})
export class SviAgreementModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SviAgreementModalComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
