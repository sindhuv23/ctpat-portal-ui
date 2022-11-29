import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { JoinSviModalComponent } from 'src/app/core/modals/join-svi-modal/join-svi-modal.component';
import { SviSettingsModalComponent } from 'src/app/core/modals/svi-settings-modal/svi-settings-modal.component';
import { SviAgreementModalComponent } from 'src/app/core/modals/svi-agreement-modal/svi-agreement-modal.component';
import { SviSendCertificationEmailModalComponent } from 'src/app/core/modals/svi-send-certification-email-modal/svi-send-certification-email-modal.component';

@Component({
  selector: 'app-svi-panel',
  templateUrl: './svi-panel.component.html',
  styleUrls: ['./svi-panel.component.scss']
})
export class SviPanelComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  isJoinSVI = false;

  ngOnInit(): void {
  }

  joinSvi(): void {
    const dialogRef = this.dialog.open(JoinSviModalComponent, {
      data: {},
      width: '560px',
      height: '600px',
      disableClose: true
    });
  }

  viewSviAgreement(): void {
    const dialogRef = this.dialog.open(SviAgreementModalComponent, {
      data: {},
      width: '560px',
      height: '340px',
      disableClose: true
    });
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(SviSettingsModalComponent, {
      data: {},
      width: '580px',
      height: '270px',
      disableClose: true
    });
  }

  sendCertificarionEmail(): void {
    const dialogRef = this.dialog.open(SviSendCertificationEmailModalComponent, {
      data: {},
      width: '560px',
      height: '470px',
      disableClose: true
    });
  }

}
