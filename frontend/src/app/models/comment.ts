import {User} from "./user";

export class Comment {
    constructor(
        public id?: number,
        public content?: string,
        public gallery_id?: number,
        public user_id?: number,
        public user?: User
    ){}
}
