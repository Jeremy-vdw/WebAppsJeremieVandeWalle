import { SummaryDataService } from './../summary-data.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Summary } from '../../models/summary.model';

@Component({
  selector: 'app-summary-own',
  templateUrl: './summary-own.component.html',
  styleUrls: ['./summary-own.component.css']
})
export class OwnSummaryComponent implements OnInit {
  private _summaries: Summary[];
  private _summarieCount;
  constructor(private authService: AuthenticationService, private _summaryDataService: SummaryDataService) { }

  ngOnInit() {
    this._summaryDataService.getSummariesUser().subscribe(items => {
      this._summaries = items;
      this._summarieCount = items.length;
    });
  }

  get summaries(): Summary[] {
    return this._summaries;
  }

  get currentUser(): Observable<string> {
    return this.authService.user$;
  }

  get amountOfSummaries(): number {
    return this._summarieCount;
  }

  get usernumber(): number {
    let user;
    this.currentUser.subscribe(item => user = item);
    let number = 0;
    for (let i = 0; i < 3; i++) {
        number += user.charCodeAt(i) - 97;
    }
    return number;
}

}
