import { TestBed } from '@angular/core/testing';

import { ApprovisionService } from './approvision.service';

describe('ApprovisionService', () => {
  let service: ApprovisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
