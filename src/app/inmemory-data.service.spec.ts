import { TestBed } from '@angular/core/testing';

import { InmemoryDataService } from './inmemory-data.service';

describe('InmemoryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InmemoryDataService = TestBed.get(InmemoryDataService);
    expect(service).toBeTruthy();
  });
});
