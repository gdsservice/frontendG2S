import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogSuppBannerComponent } from './confirmation-dialog-supp-banner.component';

describe('ConfirmationDialogSuppBannerComponent', () => {
  let component: ConfirmationDialogSuppBannerComponent;
  let fixture: ComponentFixture<ConfirmationDialogSuppBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogSuppBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogSuppBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
