import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {GalleriesService} from "../../shared/services/galleries.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-single-gallery',
    templateUrl: './single-gallery.component.html'
})
export class SingleGalleryComponent implements OnInit {

    public gallery: any[] = [];
    private params;

    constructor(public auth: AuthService, public galleryService: GalleriesService, public route: ActivatedRoute) {

        this.route.params.subscribe((params: Params) => {
            this.params = params;
        });

        this.galleryService.getSingleGallery(this.params.id).subscribe(
            data => {
                this.gallery = data;
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );

    }

    ngOnInit() {
    }

}
