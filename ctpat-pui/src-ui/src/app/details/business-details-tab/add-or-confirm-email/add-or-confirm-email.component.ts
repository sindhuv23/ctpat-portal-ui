import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddNewContactUserComponent } from '../add-new-contact-user/add-new-contact-user.component';
@Component({
  selector: 'app-add-or-confirm-email',
  templateUrl: './add-or-confirm-email.component.html',
  styleUrls: ['./add-or-confirm-email.component.scss']
})
export class AddOrConfirmEmailComponent implements OnInit {
  
  public addOrEditEmailForm! : FormGroup;
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<AddOrConfirmEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    public dialog : MatDialog) { }
  

  ngOnInit(): void {
    this.submitted = false;
      this.addOrEditEmailForm = this.formBuilder.group({
        email : new FormControl('', [Validators.required, Validators.email]),
        confirmEmail : new FormControl('', [Validators.required, Validators.email])
      }) ;
  }

  get f(): {[key: string]: AbstractControl} {
    return this.addOrEditEmailForm.controls;
  }


  continue() : void {
    this.submitted = true;
  
    if (this.addOrEditEmailForm.invalid){
      return;
   }

   if(this.f.email.value != this.f.confirmEmail.value) {
    return;
   }

    const dialogRef = this.dialog.open(AddNewContactUserComponent, 
      {
        data : {email : this.addOrEditEmailForm.get('email')?.getRawValue(), source : 'new' },
        height : '750px',
        width : '1200px'
      });
      
      dialogRef.afterOpened().subscribe(() => {this.dialogRef.close()});

  }
 
  public hasError = (controlName: string, errorName: string) => {
    return this.addOrEditEmailForm.controls[controlName].hasError(errorName);
  }


  cancel() : void {
    this.dialogRef.close();
  }

}
