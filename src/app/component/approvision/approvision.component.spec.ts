import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovisionComponent } from './approvision.component';

describe('ApprovisionComponent', () => {
  let component: ApprovisionComponent;
  let fixture: ComponentFixture<ApprovisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
