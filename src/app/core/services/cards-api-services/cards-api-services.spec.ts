import { TestBed } from '@angular/core/testing';

import { CardsApiServices } from './cards-api-services';

describe('CardsApiServices', () => {
  let service: CardsApiServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsApiServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
