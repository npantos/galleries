import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LayoutComponent} from './components/layout/layout.component';

import {AllGalleriesComponent} from './components/all-galleries/all-galleries.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './components/auth/login/login.component';
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from './components/auth/register/register.component';
import {AuthService} from "./shared/services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {GalleriesService} from "./shared/services/galleries.service";
import { SingleGalleryComponent } from './components/single-gallery/single-gallery.component';
import { AuthorGalleriesComponent } from './components/author-galleries/author-galleries.component';
import { CreateGalleryComponent } from './components/create-gallery/create-gallery.component';



@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        AllGalleriesComponent,
        LoginComponent,
        RegisterComponent,
        SingleGalleryComponent,
        AuthorGalleriesComponent,
        CreateGalleryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        GalleriesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
