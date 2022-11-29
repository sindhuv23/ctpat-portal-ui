import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/modals/confirmation-dialog/confirmation-dialog.component';
import { NotificationsComponent } from '../modals/notifications/notifications.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(title: string, msg: string, btnName1: string, btnName2: string, height: string = '170px'): any {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height,
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        title,
        message: msg,
        btn1: btnName1,
        btn2: btnName2

      }
    });
  }

  openNotificationDialog(title: string, msg: string): any {
    return this.dialog.open(NotificationsComponent, {
      width: '730px',
      height: '330px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        title,
        message: msg
      }
    });
  }
}
