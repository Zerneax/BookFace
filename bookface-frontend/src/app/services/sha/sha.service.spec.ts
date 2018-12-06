import { TestBed } from '@angular/core/testing';

import { ShaService } from './sha.service';

describe('ShaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShaService = TestBed.get(ShaService);
    expect(service).toBeTruthy();
  });
});
