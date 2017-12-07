import { User } from './user.model';

export class Rating {

    private _id: string;
    private _number: number;
    private _user: User;

    constructor(number: number) {
        this._number = number;
    }

    static fromJSON(json): Rating {
        const rec = new Rating(json.number);
        rec._user = json.user;
        rec._id = json._id;
        return rec;
    }

    get user(): User {
        return this._user;
    }

    get number(): number {
        return this._number;
    }

    set number(number: number) {
        this._number = number;
    }
    get id(): string {
        return this._id;
    }

    toJSON() {
        return {
            _id: this._id,
            number: this._number,
            user: this._user,
        };
    }
}
