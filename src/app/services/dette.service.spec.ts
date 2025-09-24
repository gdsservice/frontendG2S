import { TestBed } from '@angular/core/testing';

import { DetteService } from './dette.service';

describe('DetteService', () => {
  let service: DetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
