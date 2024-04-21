import { TestBed } from '@angular/core/testing';

import { ZapatoService } from './zapato.service';

describe('ZapatoService', () => {
  let service: ZapatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZapatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
