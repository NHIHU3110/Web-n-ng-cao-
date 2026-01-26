import { TestBed } from '@angular/core/testing';

import { Ex18service } from './ex18service';

describe('Ex18service', () => {
  let service: Ex18service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex18service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
