import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Gallery} from "../../models/gallery";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Comment} from "../../models/comment";
import {Contact} from "../../../../../../vivifyacademy-api-fe/src/app/shared/models/contact.model";



@Injectable()
export class GalleriesService {

    private galleries: Gallery[] = [];
    private gallery: Gallery[] = [];
    private comments: Comment[] = [];
    public count: number;

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    /**
     *
     * @returns {Observable<any>}
     */
    public getAllGalleries(author, page=1, term?) {

        return new Observable((o: Observer<any>) => {
            this.galleries = [];
            this.http.get('http://localhost:8000/api/all-galleries/' + author + '/' + page + '/' + term, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((data: { count: number, galleries: any[] }) => {
                data.galleries.forEach((c) => {
                    this.galleries.push(new Gallery(c));
                });
                this.count = data.count;
                o.next(this.galleries);
                return o.complete();
            });
        });
    }

    /**
     *
     * @param id
     * @returns {Observable<any>}
     */
    public getSingleGallery(id) {
        this.gallery = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/single-gallery/' + id, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((gallery: any[]) => {

                this.gallery = gallery;


                o.next(this.gallery);
                return o.complete();
            });
        });
    }

    /**
     *
     * @param id
     * @returns {Observable<any>}
     */
    public getSingleGalleryComments(id) {
        this.comments = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/comments/' + id, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((comments: any[]) => {

                this.comments = comments.map(c => new Comment(
                    c.id,
                    c.content,
                    c.gallery_id,
                    c.user_id,
                    c.user));


                o.next(this.comments);
                return o.complete();
            });
        });
    }

    /**
     *  Add comment to single gallery
     * @param {Comment} comment
     * @returns {Observable<any>}
     */
    public addComment(comment: Comment) {
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/comments', {
                content: comment.content,
                gallery_id: comment.gallery_id,
                user_id: comment.user_id
            }, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((comments: any) => {
                    const comment = new Comment(
                        comments.id,
                        comments.content,
                        comments.gallery_id,
                        comments.user_id,
                        comments.user);
                    this.comments.push(comment);
                    o.next(this.comments);
                    return o.complete();
                }, (err: HttpErrorResponse) => {
                    alert(`Backend returned code ${err.status} with message: ${err.error}`);
                }
            );
        });
    }

    /**
     * Remove comment from gallery
     * @param {Comment} comment
     * @returns {Observable<any>}
     */
    public removeComment(comment: Comment){
        return new Observable((o: Observer<any>) => {
            this.http.delete('http://localhost:8000/api/comment/' + comment.id,{
                headers: this.authService.getRequestHeaders()
            }).subscribe(
                () => {
                    const index = this.comments.indexOf(comment);
                    this.comments.splice(index, 1);

                    o.next(index);
                    return o.complete();
                }
            );
        });
    }

    /**
     * Create new gallery
     * @param {Gallery} gallery
     * @returns {Observable<any>}
     */
    public create(gallery: Gallery) {
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/add-gallery', {
                'title': gallery.title,
                'body': gallery.body,
                'images': gallery.images
            }, {
                headers: this.authService.getRequestHeaders()
            }).subscribe(
                (data: Gallery) => {
                    o.next(data);

                    return o.complete();
                },
                (err) => {
                    return o.error(err);
                }
            );
        });
    }

    /**
     * Delete gallery
     * @param {Gallery} gallery
     * @returns {Observable<any>}
     */
    public deleteGallery(gallery: Gallery){
        return new Observable((o: Observer<any>) => {
            this.http.delete('http://localhost:8000/api/gallery/' + gallery.id,{
                headers: this.authService.getRequestHeaders()
            }).subscribe(
                () => {
                    const index = this.galleries.indexOf(gallery);
                    this.galleries.splice(index, 1);

                    o.next(index);
                    return o.complete();
                }
            );
        });
    }



    public editGallery(gallery: Gallery) {
        return new Observable((o: Observer<any>) => {
            this.http.put('http://localhost:8000/api/edit-gallery/' + gallery.id, {
                'title': gallery.title,
                'body': gallery.body,
                'images': gallery.images
            }, {
                headers: this.authService.getRequestHeaders()
            }).subscribe(
                (data: Gallery) => {
                    o.next(data);

                    return o.complete();
                },
                (err) => {
                    return o.error(err);
                }
            );
        });
    }



}
