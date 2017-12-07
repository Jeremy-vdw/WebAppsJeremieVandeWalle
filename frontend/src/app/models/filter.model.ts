import { Course } from './course.model';
import { AcademicYear } from './academicyear.model';

export class Filter {

    private _text: string;
    private _courseYear: string;
    private _courseName: string;

    constructor() {
        this._text = '';
        this._courseYear = '';
        this.courseName = '';
    }

    get text(): string {
        return this._text;
    }
    set text(text: string){
        this._text = text;
    }
    get courseYear(): string {
        return this._courseYear;
    }
    set courseYear(courseYear: string){
        this._courseYear = courseYear;
    }
    get courseName(): string {
        return this._courseName;
    }
    set courseName(courseName: string){
        this._courseName = courseName;
    }
}
