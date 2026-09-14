import { TestBed } from '@angular/core/testing';

import { ProgressbarService } from './progressbar';

describe('ProgressbarService', () => {
  let service: ProgressbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
