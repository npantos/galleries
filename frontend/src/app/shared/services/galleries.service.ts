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
                    this.galleries.push(new Gallery(c.id, c.title, c.body, c.created_at, c.user_id, c.user, c.images));
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
    public getAuthorGalleries(id) {
        this.galleries = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/author/' + id, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((galleries: any[]) => {
                galleries.forEach((c) => {
                    this.galleries.push(new Gallery(c.id, c.title, c.body, c.created_at, c.user_id, c.user, c.images));
                });

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



}
