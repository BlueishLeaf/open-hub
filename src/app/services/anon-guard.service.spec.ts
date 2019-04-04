/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnonGuardService } from './anon-guard.service';

describe('Service: AnonGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonGuardService]
    });
  });

  it('should ...', inject([AnonGuardService], (service: AnonGuardService) => {
    expect(service).toBeTruthy();
  }));
});
