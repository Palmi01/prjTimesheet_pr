import { TestBed } from '@angular/core/testing';

import { prjTimesheetEntityService } from './prjTimesheet-entity.service';

describe('prjTimesheetEntityService', () => {
  let service: prjTimesheetEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(prjTimesheetEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
