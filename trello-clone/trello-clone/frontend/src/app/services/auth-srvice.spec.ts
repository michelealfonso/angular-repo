import { TestBed } from '@angular/core/testing';

import { AuthSrvice } from './auth-srvice';

describe('AuthSrvice', () => {
  let service: AuthSrvice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSrvice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
