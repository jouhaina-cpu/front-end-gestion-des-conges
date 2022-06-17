import { TestBed } from '@angular/core/testing';

import { BulletinServiceService } from './bulletinpaie-service.service';

describe('BulletinServiceService', () => {
  let service: BulletinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulletinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
