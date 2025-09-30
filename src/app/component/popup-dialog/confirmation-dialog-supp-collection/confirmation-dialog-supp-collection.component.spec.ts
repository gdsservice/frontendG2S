import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppCollectionComponent } from './confirmation-dialog-supp-collection.component';

describe('ConfirmationDialogSuppCollectionComponent', () => {
  let component: ConfirmationDialogSuppCollectionComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
