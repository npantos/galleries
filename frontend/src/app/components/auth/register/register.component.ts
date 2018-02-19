import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    constructor(private authService: AuthService,
                private router: Router) {
    }

  ngOnInit() {
  }

    register(first_name, last_name, email, password) {

        this.authService.register(first_name, last_name, email, password).subscribe(
            () => {
              this.router.navigateByUrl('/');

            }, (err: HttpErrorResponse) => {
                alert(`${err.error.error}`);
            }
        );
    }

}
