import { TestBed, inject } from '@angular/core/testing';

import { SummaryResolver} from './summary-resolver.service';

describe('SummaryResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryResolver]
    });
  });

  it('should be created', inject([SummaryResolver], (service: SummaryResolver) => {
    expect(service).toBeTruthy();
  }));
});
