import { TestBed } from '@angular/core/testing';

import { ApprovService } from './approv.service';

describe('ApprovService', () => {
  let service: ApprovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
