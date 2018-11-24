import { TestBed } from '@angular/core/testing';

import { AddOnsService } from './add-ons.service';

describe('AddOnsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddOnsService = TestBed.get(AddOnsService);
    expect(service).toBeTruthy();
  });
});
