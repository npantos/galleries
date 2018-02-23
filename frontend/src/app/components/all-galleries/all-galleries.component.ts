import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {GalleriesService} from "../../shared/services/galleries.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-all-galleries',
    templateUrl: './all-galleries.component.html'
})
export class AllGalleriesComponent implements OnInit {

    public galleries: any[] = [];
    public term: string = "";

    constructor(public auth: AuthService, public galleryService: GalleriesService) {
    }

    ngOnInit() {
        this.displayAllGalleries();
    }

    /**
     *
     * @param {string} term
     */
    displayAllGalleries(term = "") {
        this.galleryService.getAllGalleries(term).subscribe(
            data => {
                this.galleries = data;
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }

    /**
     *
     * @param term
     */
    search(term) {
        this.displayAllGalleries(term);
    }
}
