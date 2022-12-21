import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-milestone-details',
  templateUrl: './milestone-details.component.html',
  styleUrls: ['./milestone-details.component.scss']
})
export class MilestoneDetailsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['noteType', 'noteText', 'createdBy', 'createdDate', 'delete'];
  private milestones: any[] = [];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.milestones.push({
      noteType: 'Validation', noteText: 'Validation related note', createdBy: 'John Doe', createdDate: new Date('10-01-2022'),
      detete: ''
    });

    this.dataSource = new MatTableDataSource<any>(this.milestones);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

}
