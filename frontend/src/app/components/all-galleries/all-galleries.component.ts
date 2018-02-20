import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {GalleriesService} from "../../shared/services/galleries.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-all-galleries',
  templateUrl: './all-galleries.component.html'
})
export class AllGalleriesComponent implements OnInit {

    public galleries: any[] = [];

  constructor(public auth: AuthService, public galleryService: GalleriesService) {

      this.galleryService.getAllGalleries().subscribe(
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
