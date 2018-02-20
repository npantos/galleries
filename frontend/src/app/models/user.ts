// export class User {
//     public id = '';
//     public first_name = '';
//     public last_name = '';
//     public email = '';
//     public password = '';
// /*    public confirm_password = '';
//     public terms_and_conditions = false;
// */
//     constructor(data ?: {
//         id ?: number,
//         first_name ?: string,
//         last_name ?: string,
// //        email ?: string,
// //        password ?: string,
// //        confirm_password ?: string,
// //        terms_and_conditions ?: boolean
//     }) {
//         Object.assign(this, data || {});
//     }
// }

export class User {
    constructor(
        public id?: number,
        public first_name?: string,
        public last_name?: string,
    ) {}
}
