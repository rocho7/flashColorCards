import { TestBed } from '@angular/core/testing';

import { NewCard } from './new-card';

describe('NewCard', () => {
  let service: NewCard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
