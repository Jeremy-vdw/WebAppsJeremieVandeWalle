export class AcademicYear {

    private _id: string;
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    static fromJSON(json): AcademicYear {
        const rec = new AcademicYear(json.name);
        rec._id = json._id;
        return rec;
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

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
        };
    }
}
