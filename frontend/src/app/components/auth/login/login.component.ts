import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    login(email, password) {
        //console.log(this.authService.login(email, password));
        this.authService.login(email, password).subscribe(
            () => {
                this.router.navigateByUrl('/');
            }, (err: HttpErrorResponse) => {
                alert(`${err.error.error}`);
            }
        );
    }
}
