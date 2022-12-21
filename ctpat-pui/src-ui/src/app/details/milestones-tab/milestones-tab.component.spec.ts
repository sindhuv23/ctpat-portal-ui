import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonesTabComponent } from './milestones-tab.component';

describe('MilestonesTabComponent', () => {
  let component: MilestonesTabComponent;
  let fixture: ComponentFixture<MilestonesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestonesTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilestonesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
