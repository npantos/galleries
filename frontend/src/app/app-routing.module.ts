import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllGalleriesComponent} from "./components/all-galleries/all-galleries.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {SingleGalleryComponent} from "./components/single-gallery/single-gallery.component";
import {CreateGalleryComponent} from "./components/create-gallery/create-gallery.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {GuestGuard} from "./guards/guest/guest.guard";


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
        canActivate: [AuthGuard],
        component: AllGalleriesComponent
    },
    {
        path: 'login',
        canActivate: [GuestGuard],
        component: LoginComponent
    },
    {
        path: 'register',
        canActivate: [GuestGuard],
        component: RegisterComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
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
