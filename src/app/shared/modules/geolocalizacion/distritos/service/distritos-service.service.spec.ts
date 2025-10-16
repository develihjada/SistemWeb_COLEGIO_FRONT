import { TestBed } from '@angular/core/testing';

import { DistritosServiceService } from './distritos-service.service';

describe('DistritosServiceService', () => {
  let service: DistritosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistritosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
