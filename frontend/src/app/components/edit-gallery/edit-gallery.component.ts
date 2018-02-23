import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

import {Gallery} from '../../models/gallery';
import {Image} from '../../models/image';
import {GalleriesService} from "../../shared/services/galleries.service";
import {AuthService} from "../../shared/services/auth.service";
import {Comment} from "../../models/comment";
import {User} from "../../models/user";


@Component({
    selector: 'app-edit-gallery',
    templateUrl: './edit-gallery.component.html',
    styleUrls: ['./edit-gallery.component.css']
})
export class EditGalleryComponent implements OnInit {

    public gallery: Gallery = new Gallery();
    public errors: any[] = [];
    public error: string;
    private params;

    constructor(private galleryService: GalleriesService,
                private router: Router,
                private route: ActivatedRoute,
                private auth: AuthService) {

        this.route.params.subscribe((params: Params) => {
            this.params = params;
        });

        this.galleryService.getSingleGallery(this.params.id).subscribe(
            data => {
                this.gallery = new Gallery(data);
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );

    }


    ngOnInit() {
    }

    public editGallery() {

        this.galleryService.editGallery(this.gallery)

            .subscribe(() => {
                this.router.navigateByUrl('/');
            }, (e) => {
                let errorObjects = e.error.errors;

                this.errors = Object.keys(errorObjects).map(key => {
                        return errorObjects[key][0];
                    },
                    (err: HttpErrorResponse) => {
                        alert(`${err.error.error}`);
                    });
            });
    }

    public addNewImage() {
        this.gallery.images.push(new Image());
    }

    public moveImageUp(image: Image) {
        this.moveImage(image, -1);
    }

    public moveImageDown(image: Image) {
        this.moveImage(image, 1);
    }

    public moveImage(image: Image, delta: number) {
        const index = this.gallery.images.indexOf(image);
        const newIndex = index + delta;

        if (newIndex < 0 || newIndex === this.gallery.images.length) {
            return;
        }

        const indexes = [index, newIndex].sort();

        this.gallery.images.splice(indexes[0], 2, this.gallery.images[indexes[1]], this.gallery.images[indexes[0]]);
    }

    public setOrder(index, image: Image) {
        image.order = index + 1;

        return image.order;
    }

    public removeImage(image: Image) {
        const index = this.gallery.images.indexOf(image);


        if (index === 0) {
            return;
        }

        this.gallery.images.splice(index, 1);
    }
}
