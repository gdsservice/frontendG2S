import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetteComponent } from './dette.component';

describe('DetteComponent', () => {
  let component: DetteComponent;
  let fixture: ComponentFixture<DetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
