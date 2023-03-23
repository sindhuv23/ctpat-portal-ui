import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { SviPanelComponent } from 'src/app/details/svi-tab/svi-panel/svi-panel.component';

@Component({
  selector: 'app-join-svi-modal',
  templateUrl: './join-svi-modal.component.html',
  styleUrls: ['./join-svi-modal.component.scss']
})
export class JoinSviModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JoinSviModalComponent>, private formBuilder: FormBuilder) { }

  public joinSviForm!: FormGroup;

  ngOnInit(): void {

    this.joinSviForm = this.formBuilder.group({
      agree: new FormControl(''),
      autoAcceptRequest: new FormControl(''),
      shareMore: new FormControl('')
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  joinSVI(): void {

    if(true){

// some logic for registering or joining
    this.dialogRef.close();
    }

}
    
  }

//}
