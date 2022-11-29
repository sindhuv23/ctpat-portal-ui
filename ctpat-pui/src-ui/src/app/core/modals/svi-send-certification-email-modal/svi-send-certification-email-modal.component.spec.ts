import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviSendCertificationEmailModalComponent } from './svi-send-certification-email-modal.component';

describe('SviSendCertificationEmailModalComponent', () => {
  let component: SviSendCertificationEmailModalComponent;
  let fixture: ComponentFixture<SviSendCertificationEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SviSendCertificationEmailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviSendCertificationEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
