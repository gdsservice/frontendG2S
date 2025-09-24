import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppCatComponent } from './confirmation-dialog-supp-cat.component';

describe('ConfirmationDialogSuppCatComponent', () => {
  let component: ConfirmationDialogSuppCatComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
