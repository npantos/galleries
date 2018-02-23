export class Image {
    public id = '';
    public url = '';
    public order: number;

    constructor(data ?: {
        id ?: number,
        url ?: string,
        order ?: number
    }) {
        Object.assign(this, data || {});
    }
}
