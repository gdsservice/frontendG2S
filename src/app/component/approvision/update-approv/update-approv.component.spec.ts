import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApprovComponent } from './update-approv.component';

describe('UpdateApprovComponent', () => {
  let component: UpdateApprovComponent;
  let fixture: ComponentFixture<UpdateApprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateApprovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateApprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
