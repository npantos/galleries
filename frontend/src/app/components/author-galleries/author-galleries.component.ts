import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {GalleriesService} from "../../shared/services/galleries.service";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-author-galleries',
  templateUrl: './author-galleries.component.html'
})
export class AuthorGalleriesComponent implements OnInit {

    public galleries: any[] = [];
    private params;

    constructor(public auth: AuthService, public galleryService: GalleriesService,  public route: ActivatedRoute) {

        this.route.params.subscribe((params: Params) => {
            this.params = params;
        });

        this.galleryService.getAuthorGalleries(this.params.id).subscribe(
            data => {
                this.galleries = data;
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );

    }

  ngOnInit() {
  }

}
