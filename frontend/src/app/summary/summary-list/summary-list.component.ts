import { Observable } from 'rxjs/Observable';
import {SummaryDataService} from '../summary-data.service';
import { Component, OnInit } from '@angular/core';
import { Summary } from '../../models/summary.model';
import { Course } from '../../models/course.model';
import { Filter } from '../../models/filter.model';


@Component({
  selector: 'app-summary-list',
  templateUrl: './summary-list.component.html',
  styleUrls: ['./summary-list.component.css']
})
export class SummaryListComponent implements OnInit {
  private _summaries: Summary[];
  private _courseYears: string[] = ['1TIN', '2TIN', '3TIN'];
  private _courses: Course[];
  text: string;
  selectedCourseYear: string;
  selectedCourse: Course;
  private _disableCourses: Boolean = true;
  private _filter: Filter;

  constructor(private _summaryDataService: SummaryDataService) {
    this._filter = new Filter();
  }

  ngOnInit() {
    /* reserve the summmaries -> newest above */
    this._summaryDataService.findSummaries().subscribe(items => this._summaries = items.reverse());
  }
  /* update summaries with filter */
  updateSummaries() {
    this._summaryDataService.findSummaries(this._filter).subscribe(items => this._summaries = items.reverse());
  }
  /* called everytime when input changed */
  filterSummaries(text) {
    this._filter.text = text;
    this.updateSummaries();
  }
  /* called when courseYear changed -> reset course */
  courseYearChanged(courseYear) {
    this.selectedCourseYear = courseYear;
    this.selectedCourse = new Course(null, null);
    this._summaryDataService.getCoursesByCourseYear(courseYear).subscribe(items => this._courses = items);
    this._disableCourses = false;
    this._filter.courseName = '';
    this._filter.courseYear = courseYear;
    this.updateSummaries();
  }
  /* called when course changed */
  courseChanged(course) {
    this._filter.courseName = course.courseName;
    this.updateSummaries();
  }
  /* reset all filters */
  resetFilters() {
    this.selectedCourseYear = '';
    this.text = '';
    this.selectedCourse = new Course(null, null);
    this._disableCourses = true;
    this._filter = new Filter();
    this.updateSummaries();
  }

  get summaries(): Summary[] {
    return this._summaries;
  }

  get courseYears(): string[] {
    return this._courseYears;
  }

  get courses(): Course[] {
    return this._courses;
  }

  /* user can only select course when courseyear is selected */
  get disableCourses(): Boolean {
    return this._disableCourses;
  }

}
