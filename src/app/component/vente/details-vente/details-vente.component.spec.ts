import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVenteComponent } from './details-vente.component';

describe('DetailsVenteComponent', () => {
  let component: DetailsVenteComponent;
  let fixture: ComponentFixture<DetailsVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsVenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
