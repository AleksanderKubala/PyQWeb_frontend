import { TestBed, inject } from '@angular/core/testing';

import { GateService } from './gate.service';

describe('GateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GateService]
    });
  });

  it('should be created', inject([GateService], (service: GateService) => {
    expect(service).toBeTruthy();
  }));
});
