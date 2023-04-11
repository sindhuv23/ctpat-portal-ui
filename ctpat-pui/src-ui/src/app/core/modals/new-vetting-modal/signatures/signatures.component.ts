import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.scss']
})
export class SignaturesComponent implements OnInit {

  public signatureForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signatureForm = this.formBuilder.group({
      scssNameSignature: new FormControl(''),
      vettingDecision: new FormControl(''),
      subStatus: new FormControl(''),
      vettingThreshold: new FormControl(''),
      scssComments: new FormControl(''),
      supervisorNameSignature: new FormControl(''),
      supervisorSelection: new FormControl(''),
      supervisorComments: new FormControl('')
    });
  }

  public getData(): any{
    return this.signatureForm.getRawValue();
  }

}
