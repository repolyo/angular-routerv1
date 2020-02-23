import { TestBed } from '@angular/core/testing';

import { CrisisService } from './crisis.service';

describe('HeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrisisService = TestBed.get(CrisisService);
    expect(service).toBeTruthy();
  });
});
