import { Observable } from 'rxjs/Observable';
import {SummaryDataService} from '../summary-data.service';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../../user/authentication.service';
import { Summary } from '../../models/summary.model';
import { Rating } from '../../models/rating.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-summary-detail',
  templateUrl: './summary-detail.component.html',
  styleUrls: ['./summary-detail.component.css']
})
export class SummaryDetailComponent implements OnInit {
  private _summary: Summary;
  private _readOnlyRate: Boolean = false;
  averageRating: number;    


  constructor(private authService: AuthenticationService,
    private route: ActivatedRoute, private summaryDataService: SummaryDataService) { }

  ngOnInit() {
    console.log(this.authService.user$.value);
    this.route.data.subscribe(item => {
      this._summary = item['summary'];
      if (item['summary'].user.username === this.authService.user$.value) {
        // user is owner of summary
        this._readOnlyRate = true;
      }
    });
    this._summary.ratings.forEach(item => {
      if (item.user.username === this.authService.user$.value) {
        // user already vote
          this._readOnlyRate = true;
      }
    });
    this.generateAverageRating();
  }

  get summary(): Summary {
    return this._summary;
  }

  get numberOfRatings(): number {
    return this._summary.ratings.length;
  }

  get readOnlyRate(): Boolean {
    if (!this.authService.user$.value) {
      this._readOnlyRate = true;
    }
    return this._readOnlyRate;
  }

  rateTheSummary(number) {
    const rating = new Rating(number);
    this._summary.addRating(rating);
    this._readOnlyRate = true;
    this.summaryDataService.addRatingToSummary(this._summary, rating).subscribe();
    this.generateAverageRating();
  }

  newCommentAdded(comment) {
    /* update front end without reload */
    comment.user = new User(this.authService.user$.value);
    this._summary.addComment(comment);
  }

  generateAverageRating() {
    if (this._summary.ratings.length > 0) {
      let sum = 0;
      this._summary.ratings.forEach(item => sum += item.number);
      this.averageRating = sum / this._summary.ratings.length;
    }
   this.averageRating = 0;
  }

  download() {
    const filePath = this._summary.link;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
  }

  get currentUser(): Observable<string> {
    return this.authService.user$;
  }

  get disableDownload() {
    if (this.authService.user$.value) {
      return false;
    }
    return true;
  }

  get pdf(){
    return `../../../assets/pdf-examples/${this.summary.link}`;
  }

  /* transform username to number so we can use randomuser.me images as profile pictures */
  get usernumber(): number {
    let number = 0;
    for (let i = 0; i < 3; i++) {
        number += this._summary.user.username.charCodeAt(i) - 97;
    }
    return number;
}
}
