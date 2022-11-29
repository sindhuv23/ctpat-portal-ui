import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSviModalComponent } from './join-svi-modal.component';

describe('JoinSviModalComponent', () => {
  let component: JoinSviModalComponent;
  let fixture: ComponentFixture<JoinSviModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinSviModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinSviModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
