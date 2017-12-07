import { User } from './user.model';

export class Comment {
    private _id: string;
    private _text: string;
    private _user: User;
    private _date: Date;


    static fromJSON(json): Comment {
        const rec = new Comment(json.text, json.date);
        rec._id = json._id;
        rec._user = json.user;
        return rec;
    }

    constructor(text: string, date: Date) {
        this._text = text;
        this._date = date;
    }

    get id(): string {
        return this._id;
    }

    get text(): string {
        return this._text;
    }

    set text(text: string){
        this._text = text;
    }

    get date(): Date {
        return this._date;
    }

    set date(date: Date){
        this._date = date;
    }

    get user(): User {
        return this._user;
    }

    set user(user: User){
        this._user = user;
    }

    toJSON() {
        return {
            _id: this._id,
            text: this._text,
            date: this._date,
            user: this._user
        };
    }
 }
