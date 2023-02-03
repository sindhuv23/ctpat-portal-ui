import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-security-profile-section-modal',
  templateUrl: './edit-security-profile-section-modal.component.html',
  styleUrls: ['./edit-security-profile-section-modal.component.scss']
})
export class EditSecurityProfileSectionModalComponent implements OnInit, AfterViewInit {

  constructor(public dialogRef: MatDialogRef<EditSecurityProfileSectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  questions!: any[];
  displayedColumns: string[] = ['name', 'size', 'uploadedDate', 'uploadedBy', 'type'];
  public dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    if (!this.data.internalUser) {
      this.displayedColumns.push('removeAssociation');
    }
    this.questions = [{
      header: 'Audit Program(2)', text: 'Is the supply chain security program designed with, supported by, and implemented by an appropriate written review component?  The purpose of this review component is to document that a system is in place whereby personnel are held accountable for their responsibilities and all security procedures outlined by the security program are being carried out as designed.  This is a requirement.'
    }, {
      header: 'Updating Audit Program(3)', text: 'Is the review plan updated as needed based on pertinent changes in your organization’s operations and level of risk?  This is a requirement.'
    }, {
      header: 'Updates to Management(4)', text: 'The role of a company’s upper management in CTPAT is to provide support and oversight to ensure the creation and maintenance of the company’s Supply Chain Security Program. To this end, do the CTPAT point(s) of contact (POC) provide regular updates regarding the progress or outcomes of any audits, exercises, or validations?'
    }, {
      header: 'Upper Management Resposibility: POC Requirements(5) ', text: 'Are the POCs knowledgeable about CTPAT’s program requirements?  This is a requirement.'
    }, {
      header: 'Statement of Support(6)', text: 'In promoting a culture of security, is commitment to supply chain security and the CTPAT program demonstrated through a statement of support?  Is the statement signed by a senior company official and displayed in appropriate company locations?'
    }];
  }

  ngAfterViewInit(): void {
    const data: any[] = [{ name: 'Sample.pdf', size: '33KB', uploadedDate: '07/08/2022', uploadedBy: 'John Doe', type: 'Other', removeAssociation: 'Remove' }];
    this.dataSource = new MatTableDataSource<any>(data);
  }

  upload(): void {

  }

  associate(): void {

  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close();
  }

  approveAll(): void {
    this.dialogRef.close();
  }

  rejectAll(): void {
    this.dialogRef.close();
  }

}
