import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-history',
  templateUrl: './business-history.component.html',
  styleUrls: ['./business-history.component.scss']
})
export class BusinessHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addBusinessHistory(): void{
    console.log('open add business history modal');
  }

}
