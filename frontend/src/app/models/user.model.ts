export class User {
    private _id: string;
    private _username: string;

    constructor(username: string) {
        this._username = username;
    }

    static fromJSON(json): User {
        const rec = new User(json.username);
        rec._id = json._id;
        return rec;
    }


    get id(): string {
        return this._id;
    }

    set id(id: string){
        this._id = id;
    }

    get username(): string {
        return this._username;
    }

    set username(username: string){
        this._username = username;
    }

}
