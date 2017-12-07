import { SummaryDataService } from './summary-data.service';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { Summary } from '../models/summary.model';

@Injectable()
export class SummaryResolver implements Resolve<Summary> {

  constructor(private summaryDataService: SummaryDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Summary> {
    return this.summaryDataService.getSummary(route.params['id']);
  }

}
