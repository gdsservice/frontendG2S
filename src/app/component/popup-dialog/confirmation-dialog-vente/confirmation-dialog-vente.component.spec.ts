import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogVenteComponent } from './confirmation-dialog-vente.component';

describe('ConfirmationDialogVenteComponent', () => {
  let component: ConfirmationDialogVenteComponent;
  let fixture: ComponentFixture<ConfirmationDialogVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogVenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
