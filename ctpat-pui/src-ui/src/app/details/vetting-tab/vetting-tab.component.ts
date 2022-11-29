import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vetting-tab',
  templateUrl: './vetting-tab.component.html',
  styleUrls: ['./vetting-tab.component.scss']
})
export class VettingTabComponent implements OnInit {

  hideProfileWarning = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
