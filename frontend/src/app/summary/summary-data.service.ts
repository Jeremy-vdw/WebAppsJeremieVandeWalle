import {filter} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../user/authentication.service';
import { Summary } from '../models/summary.model';
import { Filter } from '../models/filter.model';
import { AcademicYear } from '../models/academicyear.model';
import { Course } from '../models/course.model';
import { Comment } from '../models/comment.model';
import { Rating } from '../models/rating.model';

@Injectable()
export class SummaryDataService {
  private _summaries = new Array<Summary>();
  private readonly _appUrl = 'http://localhost:4200/api';

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  findSummaries(fil?: Filter): Observable<Summary[]> {
    if (fil === undefined) {
      return this.http.get(`${this._appUrl}/summaries/`).map(response =>
        response.json().map(item => Summary.fromJSON(item))
      );
    }else {
      return this.http.get(`${this._appUrl}/summaries/`).map(response =>
        response.json().map(item => Summary.fromJSON(item))
        .filter(item =>  new RegExp('.*' + fil.text + '.*', 'i').test(item.name) === true)
        .filter(item => new RegExp('.*' + fil.courseYear + '.*', 'i').test(item.course.courseYear) === true)
        .filter(item => new RegExp('.*' + fil.courseName + '.*', 'i').test(item.course.courseName) === true)
      );
    }
  }

  getSummary(id): Observable<Summary> {
    return this.http.get(`${this._appUrl}/summary/${id}`).map(response => response.json()).map(item => Summary.fromJSON(item));
  }

  getSummariesUser(): Observable<Summary[]> {
    return this.http.get(`${this._appUrl}/summaries/me`,
    { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(response =>
      response.json().map(item => Summary.fromJSON(item)));
  }

  getAcademicYears(): Observable<AcademicYear[]> {
    return this.http.get(`${this._appUrl}/academicYears/`).map(response =>
      response.json().map(item =>
        AcademicYear.fromJSON(item)));
  }

  getCourses(): Observable<Course[]> {
    return this.http.get(`${this._appUrl}/courses/`).map(response =>
      response.json().map(item =>
        Course.fromJSON(item)));
  }

  getCoursesByCourseYear(courseYear: string): Observable<Course[]> {
    return this.http.get(`${this._appUrl}/courses/${courseYear}`).map(response =>
      response.json().map(item =>
        Course.fromJSON(item)));
  }

  addNewSummary(summary): Observable<Summary> {
    return this.http.post(`${this._appUrl}/summaries/`, summary, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
      .map(res => res.json()).map(item => Summary.fromJSON(item));
  }

  addCommentToSummary(sum: Summary, com: Comment): Observable<Comment> {
    return this.http
    .post(`${this._appUrl}/summary/${sum.id}/comments`, com, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
    .map(res => res.json())
    .map(item => Comment.fromJSON(item));
  }

  addRatingToSummary(sum: Summary, rat: Rating): Observable<Rating> {
    return this.http
    .post(`${this._appUrl}/summary/${sum.id}/ratings`, rat, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
    .map(res => res.json())
    .map(item => Rating.fromJSON(item));
  }

  removeSummary(rec) {
    return this.http.delete(`${this._appUrl}/summary/${rec.id}`, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})})
    .map(res => res.json()).map(item => Summary.fromJSON(item));
  }

}
