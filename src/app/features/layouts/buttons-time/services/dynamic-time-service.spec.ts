import { TestBed } from '@angular/core/testing';

import { DynamicTimeService } from './dynamic-time-service';

describe('DynamicTimeService', () => {
  let service: DynamicTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
