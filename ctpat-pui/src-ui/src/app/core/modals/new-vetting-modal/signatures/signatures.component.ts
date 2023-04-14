import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.scss']
})
export class SignaturesComponent implements OnInit {

  public signatureForm!: FormGroup;

  public statusList$!: Observable<any>;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.signatureForm = this.formBuilder.group({
      scssName: new FormControl(''),
      scssDecision: new FormControl(''),
      subStatus: new FormControl(''),
      threshold: new FormControl(''),
      scssComments: new FormControl(''),
      supervisorName: new FormControl(''),
      supervisorDecision: new FormControl(''),
      supervisorComments: new FormControl('')
    });

    this.statusList$ = this.accountService.getAccountData('getRfStatusList'); 
  }

  public getData(): any{
    return this.signatureForm.getRawValue();
  }

}
