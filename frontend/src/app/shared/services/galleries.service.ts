import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Gallery} from "../../models/gallery";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";


@Injectable()
export class GalleriesService {

    private galleries: Gallery[] = [];
    private gallery: Gallery[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    public getAllGalleries() {
        this.galleries = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/all-galleries', {
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
    public getAuthorGalleries(id) {
        this.galleries = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/author/'+id, {
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

    public getSingleGallery(id) {
        this.gallery = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/single-gallery/'+id, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((gallery: any[]) => {

                this.gallery = gallery;


                o.next(this.gallery);
                return o.complete();
            });
        });
    }

//

}
