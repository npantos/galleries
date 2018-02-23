import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    public user: User = new User();
    public errors: any[] = [];
    constructor(private authService: AuthService,
                private router: Router) {
    }

  ngOnInit() {
  }

    register() {

        this.authService.register(this.user.first_name, this.user.last_name, this.user.email, this.user.password).subscribe(
            () => {

                this.authService.login(this.user.email, this.user.password).subscribe(
                    () => {
                        this.router.navigateByUrl('/');
                    }, (err: HttpErrorResponse) => {
                        alert(`${err.error.error}`);
                    }
                );

            }, (err: HttpErrorResponse) => {
                alert(`${err.error.error}`);
            }
        );
    }

}
