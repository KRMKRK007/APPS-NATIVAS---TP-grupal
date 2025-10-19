import { TestBed } from '@angular/core/testing';

import { AuthSim } from './auth-sim';

describe('AuthSim', () => {
  let service: AuthSim;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSim);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
