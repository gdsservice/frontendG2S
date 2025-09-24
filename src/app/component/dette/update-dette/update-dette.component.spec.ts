import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetteComponent } from './update-dette.component';

describe('UpdateDetteComponent', () => {
  let component: UpdateDetteComponent;
  let fixture: ComponentFixture<UpdateDetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
