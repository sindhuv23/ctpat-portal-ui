import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerMonitoringTabComponent } from './partner-monitoring-tab.component';

describe('PartnerMonitoringTabComponent', () => {
  let component: PartnerMonitoringTabComponent;
  let fixture: ComponentFixture<PartnerMonitoringTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerMonitoringTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerMonitoringTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
