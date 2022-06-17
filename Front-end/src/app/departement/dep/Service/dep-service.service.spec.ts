import { TestBed } from '@angular/core/testing';

import { DepServiceService } from './dep-service.service';

describe('DepServiceService', () => {
  let service: DepServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
