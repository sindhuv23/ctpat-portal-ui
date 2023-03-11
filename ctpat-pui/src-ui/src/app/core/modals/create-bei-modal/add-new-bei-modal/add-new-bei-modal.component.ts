import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-add-new-bei-modal',
  templateUrl: './add-new-bei-modal.component.html',
  styleUrls: ['./add-new-bei-modal.component.scss']
})
export class AddNewBeiModalComponent implements OnInit, OnDestroy {

  public addNewBeiForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  //eligibilitycatalog list
  public ecList$!: Observable<any>;

  constructor(public dialogRef: MatDialogRef<AddNewBeiModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.submitted = false;

    this.addNewBeiForm = this.formBuilder.group({
      beiType: new FormControl('', Validators.required),
      beiValue: new FormControl('', Validators.required)
    });
    this.ecList$ = this.accountService.getAccountData('getRfEligibilityCatalogList'); 
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addNewBeiForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addNewBeiForm.controls;
  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.addNewBeiForm.invalid){
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

