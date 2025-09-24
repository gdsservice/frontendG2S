import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogApprovComponent } from './confirmation-dialog-approv.component';

describe('ConfirmationDialogApprovComponent', () => {
  let component: ConfirmationDialogApprovComponent;
  let fixture: ComponentFixture<ConfirmationDialogApprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogApprovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogApprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
