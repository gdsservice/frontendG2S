import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppApprovComponent } from './confirmation-dialog-supp-approv.component';

describe('ConfirmationDialogSuppApprovComponent', () => {
  let component: ConfirmationDialogSuppApprovComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppApprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppApprovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppApprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
