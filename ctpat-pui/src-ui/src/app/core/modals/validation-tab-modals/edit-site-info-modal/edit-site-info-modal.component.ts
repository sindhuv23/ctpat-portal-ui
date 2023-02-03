import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-site-info-modal',
  templateUrl: './edit-site-info-modal.component.html',
  styleUrls: ['./edit-site-info-modal.component.scss']
})
export class EditSiteInfoModalComponent implements OnInit {

  siteData: any;
  public editSiteInfoForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSiteInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder){ }

  ngOnInit(): void {
    this.siteData = this.data;

    this.editSiteInfoForm = this.formBuilder.group({
      noGoZoneIndicator: new FormControl(this.siteData.noGoZoneIndicator),
      noGoReason: new FormControl(this.siteData.noGoReason),
      otherReason: new FormControl(this.siteData.otherReason),
      gpsCoordinates: new FormControl(this.siteData.gpsCoordinates),
      country: new FormControl(this.siteData.address.country),
      state: new FormControl(this.siteData.address.state),
      city: new FormControl(this.siteData.address.city),
      street: new FormControl(this.siteData.address.street),
      postalCode: new FormControl(this.siteData.address.postalCode)
    });
  }

  update(): void{
    const formRawValue = this.editSiteInfoForm.getRawValue();
    if (formRawValue.state && formRawValue.country){
      this.siteData = {noGoZoneIndicator: formRawValue.noGoZoneIndicator, noGoReason: formRawValue.noGoReason,
        otherReason: formRawValue.otherReason, gpsCoordinates: formRawValue.gpsCoordinates, address: {
          state: formRawValue.state, city: formRawValue.city, country: formRawValue.country,
          street: formRawValue.street, postalCode: formRawValue.postalCode,
        }, entryId: this.siteData.entryId};
    }

    this.dialogRef.close(this.siteData);
  }

  countrySelected(event: any): void {
    if (event){
      this.editSiteInfoForm.get('state')?.enable();
    } else {
      this.editSiteInfoForm.get('state')?.disable();
      this.editSiteInfoForm.get('state')?.setValue(null);
    }
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
