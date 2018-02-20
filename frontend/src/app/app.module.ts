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
import {CreateComponent} from './components/create/create.component';
import {HttpClientModule} from "@angular/common/http";
import {GalleriesService} from "./shared/services/galleries.service";



@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        AllGalleriesComponent,
        LoginComponent,
        RegisterComponent,
        CreateComponent
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
