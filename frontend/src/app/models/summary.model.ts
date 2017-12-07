import { User } from './user.model';
import { AcademicYear } from './academicyear.model';
import { Course } from './course.model';
import { Rating } from './rating.model';


export class Summary {
  private _id: string;
  private _name: string;
  private _link: string;
  private _user: User;
  private _academicYear: AcademicYear;
  private _course: Course;
  private _comments: Comment[];
  private _ratings: Rating[];

  static fromJSON(json): Summary {
    const rec = new Summary(json.name, json.comments);
    rec._academicYear = json.academicYear;
    rec._link = json.link;
    rec._course = json.course;
    rec._user = json.user;
    rec._id = json._id;
    rec._ratings = json.ratings;
    return rec;
}
  constructor(name: string, comments?: Comment[]) {
      this._name = name;
      this._comments = comments || new Array();
      this._ratings = new Array();
  }

  get id(): string {
      return this._id;
  }

  get name(): string {
      return this._name;
  }

  set name(name: string){
      this._name = name;
  }

  get link(): string {
      return this._link;
  }

  set link(link: string){
      this._link = link;
  }

  set academicYear(acadamicYear: AcademicYear){
      this._academicYear = acadamicYear;
  }

  get academicYear(): AcademicYear {
      return this._academicYear;
  }

  set course(course: Course){
      this._course = course;
  }

  get course(): Course{
      return this._course;
  }

  get comments(): Comment[] {
      return this._comments;
  }

  get ratings(): Rating[] {
      return this._ratings;
  }

  addRating(rating: Rating) {
      this._ratings.push(rating);
  }

  get user(): User {
      return this._user;
  }

  addComment(comment: Comment) {
      this._comments.push(comment);
  }

  toJSON() {
    return {
        _id: this._id,
        name: this._name,
        link: this._link,
        academicYear: this._academicYear,
        course: this._course,
        comments: this._comments,
        ratings: this._ratings
    };
}
}
