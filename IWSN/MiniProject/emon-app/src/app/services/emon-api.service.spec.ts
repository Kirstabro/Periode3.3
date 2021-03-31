import { TestBed } from '@angular/core/testing';

import { EmonApiService } from './emon-api.service';

describe('EmonApiService', () => {
  let service: EmonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
