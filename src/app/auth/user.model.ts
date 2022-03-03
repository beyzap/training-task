export class User {
    constructor(public email: string,
        public id: string,
        private _token: string,
        private _tokenExpraitonDate: Date
    ) { }

    get token() {

        if (!this._tokenExpraitonDate || new Date() > this._tokenExpraitonDate) {
            return null
        }

        return this._token;
    }
}