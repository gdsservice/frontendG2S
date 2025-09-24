import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprovComponent } from './add-approv.component';

describe('AddApprovComponent', () => {
  let component: AddApprovComponent;
  let fixture: ComponentFixture<AddApprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddApprovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
