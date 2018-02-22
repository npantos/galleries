import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {GalleriesService} from "../../shared/services/galleries.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Comment} from "../../models/comment";

@Component({
    selector: 'app-single-gallery',
    templateUrl: './single-gallery.component.html',
    styleUrls: ['./single-gallery.component.css']
})
export class SingleGalleryComponent implements OnInit {

    public gallery: any[] = [];
    public comments: Array<Comment> = [];
    public comment: Comment = new Comment();
    private params;

    constructor(public auth: AuthService, public galleryService: GalleriesService, public route: ActivatedRoute, router: Router) {

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

        this.galleryService.getSingleGalleryComments(this.params.id).subscribe(
            data => {
                this.comments = data;
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );

    }

    addComment(){

        this.comment.user_id=this.auth.user.id;
        this.comment.gallery_id=this.params.id;
        delete this.comment.id;

        this.galleryService.addComment(this.comment).subscribe((data) => {
            console.log(data);
           // this.comments.push(data);
            this.comments=data;
            console.log(this.comments);
        });


        /*
        .subscribe((data: any[]) => {
          this.contact = data.find(item => item['id'] == id);
          this.pageTitleService.setTitle("Contacts details - " + this.contact.firstName);
        });
         */

        /*this.comment=comment;
        this.comments.push(comment);*/
    }

    /*
    * public submit() {
        this.movie.genres = this.genres.split(',').map(genre => genre.trim());
        this.movieService.addMovie(this.movie).subscribe(() => {
            this.router.navigateByUrl('/');
        });
    }*/

    ngOnInit() {
    }

}
