import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitDialogComponent } from './produit-dialog.component';

describe('ProduitDialogComponent', () => {
  let component: ProduitDialogComponent;
  let fixture: ComponentFixture<ProduitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduitDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
