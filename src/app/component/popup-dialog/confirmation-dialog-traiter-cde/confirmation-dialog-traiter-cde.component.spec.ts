import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogTraiterCdeComponent } from './confirmation-dialog-traiter-cde.component';

describe('ConfirmationDialogTraiterCdeComponent', () => {
  let component: ConfirmationDialogTraiterCdeComponent;
  let fixture: ComponentFixture<ConfirmationDialogTraiterCdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogTraiterCdeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogTraiterCdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
