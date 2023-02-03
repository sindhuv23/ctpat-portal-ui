import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdvanceSearchModalComponent } from '../core/modals/advance-search-modal/advance-search-modal.component';

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

  openAdvanceSearchModal(): void {
    const dialogRef = this.dialog.open(AdvanceSearchModalComponent, {
      data: {},
      width: '680px',
      height: '570px',
      disableClose: true
    });
  }
}
