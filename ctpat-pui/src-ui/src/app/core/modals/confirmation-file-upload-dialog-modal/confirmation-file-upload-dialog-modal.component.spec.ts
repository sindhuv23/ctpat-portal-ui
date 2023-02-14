import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationFileUploadDialogModalComponent } from './confirmation-file-upload-dialog-modal.component';

describe('ConfirmationFileUploadDialogModalComponent', () => {
  let component: ConfirmationFileUploadDialogModalComponent;
  let fixture: ComponentFixture<ConfirmationFileUploadDialogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationFileUploadDialogModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationFileUploadDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
