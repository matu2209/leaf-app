import { TestBed } from '@angular/core/testing';

import { FilterRegisterService } from './filter-register.service';

describe('FilterRegisterService', () => {
  let service: FilterRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
