import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents-tab',
  templateUrl: './documents-tab.component.html',
  styleUrls: ['./documents-tab.component.scss']
})
export class DocumentsTabComponent implements OnInit {

  currentTabIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
