import { Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SummaryDataService } from '../summary-data.service';
import { AcademicYear } from '../../models/academicyear.model';
import { Course } from '../../models/course.model';
import { Summary } from '../../models/summary.model';


function linkValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const link = control.value;
    const extension = link.substr(link.length - 4);
    return extension === '.pdf' ? null : { 'pdfExtension': true };
  };
}

@Component({
  selector: 'app-add-summary',
  templateUrl: './add-summary.component.html',
  styleUrls: ['./add-summary.component.css']
})

export class AddSummaryComponent implements OnInit {
  @Output() public newSummary = new EventEmitter<Summary>();
  private summary: FormGroup;
  private _academicYears: AcademicYear[];
  private _selectedAcademicYear: AcademicYear;
  private _courseYears: string[] = ['1TIN', '2TIN', '3TIN'];
  private _courses: Course[];
  private _disableCourses: Boolean = true;

  constructor(private fb: FormBuilder, private _summaryDataService: SummaryDataService, private _router: Router) { }

  ngOnInit() {
    this._summaryDataService.getAcademicYears().subscribe(items => this._academicYears = items);
    this.summary = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      academicYear: ['', [Validators.required]],
      courseYear: ['', Validators.required],
      course: ['', Validators.required],
      link: ['', [Validators.required, linkValidator()]]
/* comments: this.fb.array([this.createComments() ]) */
    });
  }
  get academicYears(): AcademicYear[] {
    return this._academicYears;
  }

  get courseYears(): string[] {
    return this._courseYears;
  }

  get courses(): Course[] {
    return this._courses;
  }

  get disableCourses(): Boolean {
    return this._disableCourses;
  }

  selectionChanged(courseYear) {
    this.summary.get('course').setValue(null);
    this._summaryDataService.getCoursesByCourseYear(courseYear).subscribe(items => this._courses = items);
    this._disableCourses = false;
  }

  OnSubmit() {
    const summary = new Summary(this.summary.value.name);
    summary.academicYear = this._academicYears.find(item => item.id === this.summary.value.academicYear.id);
    summary.course = this._courses.find(item => item.id === this.summary.value.course.id);
    summary.link = this.summary.value.link;
    console.log(summary);
    this._summaryDataService.addNewSummary(summary).subscribe();
    this._router.navigate(['summary/list']);
  }
  createComments(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
}
