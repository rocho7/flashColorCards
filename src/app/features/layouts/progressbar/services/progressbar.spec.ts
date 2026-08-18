import { TestBed } from '@angular/core/testing';

import { Progressbar } from './progressbar';

describe('Progressbar', () => {
  let service: Progressbar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Progressbar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
