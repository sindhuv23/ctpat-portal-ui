import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  refresh() {
    console.log("refreshed called");
    this.refreshEvent.emit();
  }
}
