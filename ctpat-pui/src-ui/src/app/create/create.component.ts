import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CreateAccountModalComponent } from '../core/modals/create-account-modal/create-account-modal.component';
import { CtpatUserService } from '../core/services/ctpat-user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  constructor(public dialog: MatDialog, public ctpatUserService: CtpatUserService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createAccount(): void {
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      data: {},
      width: '1200px',
      height: '1080px',
      disableClose: true
    });
  }

}
