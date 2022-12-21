import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMilestoneModalComponent } from './add-milestone-modal.component';

describe('AddMilestoneModalComponent', () => {
  let component: AddMilestoneModalComponent;
  let fixture: ComponentFixture<AddMilestoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMilestoneModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMilestoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
