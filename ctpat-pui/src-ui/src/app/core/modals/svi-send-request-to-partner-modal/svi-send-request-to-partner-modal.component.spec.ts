import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviSendRequestToPartnerModalComponent } from './svi-send-request-to-partner-modal.component';

describe('SviSendRequestToPartnerModalComponent', () => {
  let component: SviSendRequestToPartnerModalComponent;
  let fixture: ComponentFixture<SviSendRequestToPartnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SviSendRequestToPartnerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviSendRequestToPartnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
