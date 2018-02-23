import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {GalleriesService} from "../../shared/services/galleries.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-all-galleries',
    templateUrl: './all-galleries.component.html',
    styleUrls: ['./all-galleries.component.scss']
})
export class AllGalleriesComponent implements OnInit {

    public galleries: any[] = [];
    public term: string = "";
    public page: number = 1;
    private params;
    private author: string;

    constructor(public auth: AuthService, public galleryService: GalleriesService, public route: ActivatedRoute) {
        this.route.params.subscribe((params: Params) => {
            this.params = params;
        });
    }

    ngOnInit() {
            this.displayAllGalleries();
    }

    /**
     * Display all galeries
     * @param {string} term
     */
    displayAllGalleries(term = "") {

        if(this.params.id){
            this.author = this.params.id;
        }
        else{
            this.author = 'all';
        }

        this.galleryService.getAllGalleries(this.author ,this.page, term).subscribe(
            data => {
                this.galleries = data;
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }


    /**
     * Search gallery
     * @param term
     */
    search(term) {
        this.page=1;
        this.displayAllGalleries(term);
    }

    /**
     * Load more results
     */
    loadMore() {
        this.page++;
        this.galleryService.getAllGalleries('all',this.page, this.term).subscribe(
            (galleries) => {
                this.galleries = this.galleries.concat(galleries);
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            });
    }

    deleteGallery(gallery){
        if(confirm("Are you sure to delete?")) {
            this.galleryService.deleteGallery(gallery).subscribe();
        }
    }

    editGallery(){

    }

}
