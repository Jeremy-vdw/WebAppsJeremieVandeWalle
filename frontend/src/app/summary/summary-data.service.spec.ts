import { TestBed, inject } from '@angular/core/testing';

import { SummaryDataService } from './summary-data.service';

describe('SummaryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryDataService]
    });
  });

  it('should be created', inject([SummaryDataService], (service: SummaryDataService) => {
    expect(service).toBeTruthy();
  }));
});
