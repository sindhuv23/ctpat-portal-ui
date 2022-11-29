import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  public searchForm = new FormGroup({
    accountName: new FormControl(''),
    applicationStatus: new FormControl(''),
  });

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  search(): void{
  }

  clear(): void {
    this.searchForm.get('accountName')?.setValue('');
    this.searchForm.get('applicationStatus')?.setValue('');
  }
}
