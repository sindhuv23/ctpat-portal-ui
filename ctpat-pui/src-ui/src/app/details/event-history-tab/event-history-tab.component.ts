import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-history-tab',
  templateUrl: './event-history-tab.component.html',
  styleUrls: ['./event-history-tab.component.scss']
})
export class EventHistoryTabComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  private subscriptions = new Subscription();
  public isLoading = false;

  public dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['updateDate', 'updateBy', 'eventType', 'newValue'];

  applyFilter(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let filterValue = element.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    const data: any[] = [{updateDate: '03/09/2020 12:00:00', updateBy: 'Someone Joe #2', eventType: 'Event Type Code or Text 5', newValue: 'New Value 0'},
                        {updateDate: '03/10/2020 11:00:00', updateBy: 'Someone Joe #6', eventType: 'Event Type Code or Text 4', newValue: 'New Value 1'},
                        {updateDate: '03/06/2020 09:00:00', updateBy: 'Someone Joe #1', eventType: 'Event Type Code or Text 3', newValue: 'New Value 2'},
                        {updateDate: '03/06/2020 10:00:00', updateBy: 'Someone Joe #0', eventType: 'Event Type Code or Text 2', newValue: 'New Value 3'},
                        {updateDate: '03/10/2020 22:00:00', updateBy: 'Someone Joe #3', eventType: 'Event Type Code or Text 1', newValue: 'New Value 4'}];
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
