import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecurityProfileSectionModalComponent } from './edit-security-profile-section-modal.component';

describe('EditSecurityProfileSectionModalComponent', () => {
  let component: EditSecurityProfileSectionModalComponent;
  let fixture: ComponentFixture<EditSecurityProfileSectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSecurityProfileSectionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSecurityProfileSectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
