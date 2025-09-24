import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppVenteComponent } from './confirmation-dialog-supp-vente.component';

describe('ConfirmationDialogSuppVenteComponent', () => {
  let component: ConfirmationDialogSuppVenteComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppVenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
