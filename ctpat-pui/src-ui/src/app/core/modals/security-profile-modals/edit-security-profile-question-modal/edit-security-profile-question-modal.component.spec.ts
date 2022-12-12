import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecurityProfileQuestionModalComponent } from './edit-security-profile-question-modal.component';

describe('EditSecurityProfileQuestionModalComponent', () => {
  let component: EditSecurityProfileQuestionModalComponent;
  let fixture: ComponentFixture<EditSecurityProfileQuestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSecurityProfileQuestionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSecurityProfileQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
