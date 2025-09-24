import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppClientComponent } from './confirmation-dialog-supp-client.component';

describe('ConfirmationDialogSuppClientComponent', () => {
  let component: ConfirmationDialogSuppClientComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
