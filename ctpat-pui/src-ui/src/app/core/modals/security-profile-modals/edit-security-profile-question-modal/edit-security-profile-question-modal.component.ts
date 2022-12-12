import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-security-profile-question-modal',
  templateUrl: './edit-security-profile-question-modal.component.html',
  styleUrls: ['./edit-security-profile-question-modal.component.scss']
})
export class EditSecurityProfileQuestionModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditSecurityProfileQuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  displayedColumns: string[] = ['name', 'size', 'uploadedDate', 'uploadedBy', 'type'];
  public dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    if (!this.data.internalUser) {
      this.displayedColumns.push('removeAssociation');
    }
  }

  ngAfterViewInit(): void {
    const data: any[] = [{ name: 'Sample.pdf', size: '33KB', uploadedDate: '07/08/2022', uploadedBy: 'John Doe', type: 'Other', removeAssociation: 'Remove' }];
    this.dataSource = new MatTableDataSource<any>(data);
  }

  upload(): void {

  }

  associate(): void {

  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close();
  }

}
