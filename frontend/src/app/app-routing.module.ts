import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllGalleriesComponent} from "./components/all-galleries/all-galleries.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {CreateComponent} from "./components/create/create.component";


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
        path: 'galleries:id',
        component: AllGalleriesComponent
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
        component: CreateComponent
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
