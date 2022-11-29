import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviSettingsModalComponent } from './svi-settings-modal.component';

describe('SviSettingsModalComponent', () => {
  let component: SviSettingsModalComponent;
  let fixture: ComponentFixture<SviSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SviSettingsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
