import { OnInit, Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CtpatUserService } from './core/services/ctpat-user.service';
import { CtpatConstants } from './core/utils/ctpat.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'CTPAT UI';
  private subscriptions = new Subscription();

  constructor(private ctpatUserService: CtpatUserService) {
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
