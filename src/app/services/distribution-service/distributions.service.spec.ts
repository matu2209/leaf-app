import { TestBed } from '@angular/core/testing';

import { DistributionsService } from './distribution-service/distributions.service';

describe('DistributionsService', () => {
  let service: DistributionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
