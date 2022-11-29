import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviAgreementModalComponent } from './svi-agreement-modal.component';

describe('SviAgreementModalComponent', () => {
  let component: SviAgreementModalComponent;
  let fixture: ComponentFixture<SviAgreementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SviAgreementModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviAgreementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
