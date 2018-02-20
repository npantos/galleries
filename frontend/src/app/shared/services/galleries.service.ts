import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Gallery} from "../../models/gallery";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";


@Injectable()
export class GalleriesService {

    private galleries: Gallery[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    public getAllGalleries() {
        this.galleries = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/all-galleries', {
                headers: this.authService.getRequestHeaders()
            }).subscribe((galleries: any[]) => {
                galleries.forEach((c) => {
                    this.galleries.push(new Gallery(c.id, c.title, c.body, c.user_id, c.images));
                });

                o.next(this.galleries);
                return o.complete();
            });
        });
    }

}
