import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviCertificationEmailDetailsModalComponent } from './svi-certification-email-details-modal.component';

describe('SviCertificationEmailDetailsModalComponent', () => {
  let component: SviCertificationEmailDetailsModalComponent;
  let fixture: ComponentFixture<SviCertificationEmailDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SviCertificationEmailDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviCertificationEmailDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
