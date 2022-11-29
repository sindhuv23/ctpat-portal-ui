import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-security-profile-section',
  templateUrl: './security-profile-section.component.html',
  styleUrls: ['./security-profile-section.component.scss']
})
export class SecurityProfileSectionComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscriptions = new Subscription();
  public isLoading = false;

  securityProfileForm!: FormGroup;
  sectionStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  formStatus = 0;

  displayedColumns: string[] = ['criteriaQuestion', 'status', 'attachments', 'action'];
  public dataSourceSec00 = new MatTableDataSource<any>();
  public dataSourceSec01 = new MatTableDataSource<any>();
  public dataSourceSec02 = new MatTableDataSource<any>();
  public dataSourceSec03 = new MatTableDataSource<any>();
  public dataSourceSec04 = new MatTableDataSource<any>();
  public dataSourceSec05 = new MatTableDataSource<any>();
  public dataSourceSec06 = new MatTableDataSource<any>();
  public dataSourceSec07 = new MatTableDataSource<any>();
  public dataSourceSec08 = new MatTableDataSource<any>();
  public dataSourceSec09 = new MatTableDataSource<any>();
  public dataSourceSec10 = new MatTableDataSource<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void{
    this.securityProfileForm = this.formBuilder.group({
      someControl: new FormControl(''),
    });
  }

  downloadSummary(): void{
    console.log('download summary');
  }

  submitSecurityProfile(): void{
    console.log('submit security profile');
  }

  ngAfterViewInit(): void{
    const dataSec00: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action000'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '0', action: 'action001'}];
    this.dataSourceSec00 = new MatTableDataSource<any>(dataSec00);

    const dataSec01: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action010'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action011'}];
    this.dataSourceSec01 = new MatTableDataSource<any>(dataSec01);

    const dataSec02: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action020'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action021'}];
    this.dataSourceSec02 = new MatTableDataSource<any>(dataSec02);

    const dataSec03: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action030'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action031'}];
    this.dataSourceSec03 = new MatTableDataSource<any>(dataSec03);

    const dataSec04: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action040'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action041'}];
    this.dataSourceSec04 = new MatTableDataSource<any>(dataSec04);

    const dataSec05: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action050'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action051'}];
    this.dataSourceSec05 = new MatTableDataSource<any>(dataSec05);

    const dataSec06: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action060'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action061'}];
    this.dataSourceSec06 = new MatTableDataSource<any>(dataSec06);

    const dataSec07: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action070'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action071'}];
    this.dataSourceSec07 = new MatTableDataSource<any>(dataSec07);

    const dataSec08: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action080'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action081'}];
    this.dataSourceSec08 = new MatTableDataSource<any>(dataSec08);

    const dataSec09: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action090'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action091'}];
    this.dataSourceSec09 = new MatTableDataSource<any>(dataSec09);

    const dataSec10: any[] = [{criteriaQuestion: 'Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database Question #1 from database',
    status: 'Incomplete', attachments: '1', action: 'action100'},
    {criteriaQuestion: 'Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database Question #2 from database',
    status: 'Complete', attachments: '2', action: 'action101'}];
    this.dataSourceSec10 = new MatTableDataSource<any>(dataSec10);
  }

  // edit questions based on section ID (sec00-10). IDs should come from database.
  editSec00UpperManagementResponsibility(): void{console.log('editSec00UpperManagementResponsibility'); }
  editSec01RiskAssessment(): void{}
  editSec02BusinessPartners(): void{}
  editSec03ProceduralSecurity(): void{}
  editSec04ConveyanceAndIit(): void{}
  editSec05AgriculturalProcedures(): void{}
  editSec06PhysicalSecurity(): void{}
  editSec07AccessControls(): void{}
  editSec08PersonnelSecurity(): void{}
  editSec09EducationAndTraining(): void{}
  editSec10Cybersecurity(): void{}

  // edit/view responses based on section ID (sec00-10) and question ID (0-)
  editView(id: any): void{
    console.log('edit/view ' + id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
