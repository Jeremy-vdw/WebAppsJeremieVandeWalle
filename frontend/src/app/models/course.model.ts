
export class Course {
    private _id: string;
    private _courseName: string;
    private _courseYear: string;

    constructor(courseName: string, courseYear: string) {
        this._courseName = courseName;
        this._courseYear = courseYear;
    }

    static fromJSON(json): Course {
        const rec = new Course(json.courseName, json.courseYear);
        rec._id = json._id;
        return rec;
    }

    get id(): string {
        return this._id;
    }

    get courseName(): string {
        return this._courseName;
    }

    set courseName(courseName: string) {
        this._courseName = courseName;
    }

    get courseYear(): string {
        return this._courseYear;
    }

    set courseYear(courseYear: string){
        this._courseYear = courseYear;
    }

    toJSON() {
        return {
            _id: this._id,
            courseName: this._courseName,
            courseYear: this._courseYear,
        };
    }
}
