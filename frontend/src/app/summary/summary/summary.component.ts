import {SummaryDataService} from '../summary-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {TransitionController, Transition, TransitionDirection} from 'ng2-semantic-ui';
import { Summary } from '../../models/summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() public summary: Summary;
  public transitionController = new TransitionController();
  pdfLink = '../../../assets/pdf-examples/Summary.pdf';

  constructor(private router: Router, private _summaryDataService: SummaryDataService) {

  }

  ngOnInit() {

  }

  deleteSummary() {
    this._summaryDataService.removeSummary(this.summary).subscribe();
    this.transitionController.animate(
      new Transition('fade down', 500, TransitionDirection.Out));
  }

  get averageRating(): number {
    if (this.summary.ratings.length > 0) {
      let sum = 0;
      this.summary.ratings.forEach(item => sum += item.number);
      return sum / this.summary.ratings.length;
    }
   return 0;
  }

  get pdf(){
    return `../../../assets/pdf-examples/${this.summary.link}`;
  }

  get numberOfComments(): number {
    return this.summary.comments.length;
  }

  get labelClass(): string {
    if (this.summary.ratings.length === 0) {
      return 'ui grey label';
    }
    if (this.averageRating < 5) {
      return 'ui red label';
    }
    if (this.averageRating < 8) {
      return 'ui orange label';
    }
    return 'ui green label';
  }


}
