/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StorgeService } from './storge.service';

describe('Service: Storge', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorgeService]
    });
  });

  it('should ...', inject([StorgeService], (service: StorgeService) => {
    expect(service).toBeTruthy();
  }));
});
