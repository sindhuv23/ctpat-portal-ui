import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { BeiTabService } from '../../services/bei-tab.service';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-edit-modes-transport-modal',
  templateUrl: './edit-modes-transport-modal.component.html',
  styleUrls: ['./edit-modes-transport-modal.component.scss']
})
export class EditModesTransportModalComponent implements OnInit, OnDestroy {

  public modesTransportForm!: FormGroup;
  private subscriptions = new Subscription();
  public submitted = false;
  public ctpatAccountId = '';
  public modesTransport: any;

  constructor(public dialogRef: MatDialogRef<EditModesTransportModalComponent>, private beiTabService: BeiTabService,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
              private accountService: AccountService, private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.ctpatAccountId = this.data.ctpatAccountId;

    this.modesTransportForm = this.formBuilder.group({
      // checkboxes
      airIndicator: new FormControl(false),
      seaIndicator: new FormControl(false),
      landIndicator: new FormControl(false)
    });

    this.populateFields();
  }

  populateFields(): void{
    this.modesTransport = this.data.modesTransport;
    for (const mode of this.modesTransport){
      if (mode.consolidator_values === 'Air'){
        this.modesTransportForm.get('airIndicator')?.setValue(true);
      } else if (mode.consolidator_values === 'Sea'){
        this.modesTransportForm.get('seaIndicator')?.setValue(true);
      } else if (mode.consolidator_values === 'Land'){
        this.modesTransportForm.get('landIndicator')?.setValue(true);
      }
    }

  }

  save(): void{
    this.submitted = true;
    // UI validation before this point
    if (this.modesTransportForm.invalid || !this.isAnyTransportModeSelected()){
      return;
    }

    const rawValues = this.modesTransportForm.getRawValue();

    const modes = {air: rawValues.airIndicator ? 'Air' : '',
    sea: rawValues.seaIndicator ? 'Sea' : '',
    land: rawValues.landIndicator ? 'Land' : '',
    ctpatAccountId: this.ctpatAccountId};

    this.subscriptions.add(this.beiTabService.saveModesTransport(modes)
    .subscribe((data: any) => {
      this.accountService.broadcastAccountId(parseInt(this.ctpatAccountId, 10));
      this.detailsService.broadcastCurrentTabIndex(1);
      this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.dialogRef.close();
      }));
  }

  isAnyTransportModeSelected(): boolean {
    const formRawValue = this.modesTransportForm.getRawValue();
    return formRawValue.airIndicator
        || formRawValue.seaIndicator
        || formRawValue.landIndicator;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.modesTransportForm.controls[controlName].hasError(errorName);
  }

  get f(): {[key: string]: AbstractControl} {
    return this.modesTransportForm.controls;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
