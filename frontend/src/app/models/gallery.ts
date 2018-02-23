import { Image } from './image';
import { User } from './user';

export class Gallery {
    public id: '';
    public title = '';
    public body = '';
    public user = new User();
    public created_at = '';
    public user_id = '';
    public images: Image[] = [new Image()];

    constructor(data ?: {
        id ?: number,
        title ?: string,
        body ?: string,
        user ?: User,
        created_at ?: Date,
        user_id ?: number,
        images ?: Image[]
    }) {
        Object.assign(this, data || {});
    }
}
