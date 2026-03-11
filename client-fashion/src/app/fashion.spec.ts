import { TestBed } from '@angular/core/testing';

import { Fashion } from './fashion';

describe('Fashion', () => {
  let service: Fashion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fashion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
