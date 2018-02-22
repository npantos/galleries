import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllGalleriesComponent} from "./components/all-galleries/all-galleries.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {SingleGalleryComponent} from "./components/single-gallery/single-gallery.component";
import {AuthorGalleriesComponent} from "./components/author-galleries/author-galleries.component";
import {CreateGalleryComponent} from "./components/create-gallery/create-gallery.component";


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/all-galleries',
        pathMatch: 'full'
    },
    {
        path: 'all-galleries',
        component: AllGalleriesComponent
    },
    {
        path: 'gallery/:id',
        component: SingleGalleryComponent
    },
    {
        path: 'author/:id',
        component: AuthorGalleriesComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'create',
        component: CreateGalleryComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
