import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar-service.service';

describe('SnackbarServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackbarService = TestBed.get(SnackbarService);
    expect(service).toBeTruthy();
  });
});
