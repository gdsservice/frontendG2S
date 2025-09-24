import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppProdComponent } from './confirmation-dialog-supp-prod.component';

describe('ConfirmationDialogSuppProdComponent', () => {
  let component: ConfirmationDialogSuppProdComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
