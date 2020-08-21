import { TestBed } from '@angular/core/testing';

import { MapProvidersService } from './map-providers.service';

describe('MapProvidersService', () => {
  let service: MapProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
