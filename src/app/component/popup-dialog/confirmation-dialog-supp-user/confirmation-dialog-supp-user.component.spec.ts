import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppUserComponent } from './confirmation-dialog-supp-user.component';

describe('ConfirmationDialogSuppUserComponent', () => {
  let component: ConfirmationDialogSuppUserComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
