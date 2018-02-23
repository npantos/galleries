import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../models/gallery";
import { FormsModule, Validators } from '@angular/forms';
import {Image} from "../../models/image";
import {HttpErrorResponse} from "@angular/common/http";
import {GalleriesService} from "../../shared/services/galleries.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-create-gallery',
    templateUrl: './create-gallery.component.html',
})
export class CreateGalleryComponent implements OnInit {
    public gallery: Gallery = new Gallery();
    public errors: any[] = [];

    constructor(private galleryService: GalleriesService,
                private router: Router
    ) {
    }

    create() {

        this.galleryService.create(this.gallery)
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

    ngOnInit() {
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

        if (newIndex < 0  || newIndex === this.gallery.images.length) {
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
