import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppDetteComponent } from './confirmation-dialog-supp-dette.component';

describe('ConfirmationDialogSupprimerComponent', () => {
  let component: ConfirmationDialogSuppDetteComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppDetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppDetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppDetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
