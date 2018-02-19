import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

    public isAuthenticated:boolean;

    constructor(private http: HttpClient, private router: Router) {
        //this.isAuthenticated = !!window.localStorage.getItem('loginToken');
        //this.isAuthenticated = true;
    }

    public getRequestHeaders() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'));
    }

    login(email: string, password: string) {
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/login', {
                'email': email,
                'password': password
            }).subscribe((data: { token: string }) => {
                window.localStorage.setItem('loginToken', data.token);
                this.isAuthenticated = true;
                o.next(data.token);
                return o.complete();
            }, (error) => {
                return o.error(error);
            });
        });
    }

    register(first_name: string, last_name:string, email: string, password: string) {
        console.log(first_name+last_name+email+password);
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/register', {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password,
            }).subscribe((data: { token: string }) => {
                o.next(data.token);
                return o.complete();
            }, (error) => {
                return o.error(error);
            });
        });
    }

    logout(){
        window.localStorage.removeItem('loginToken');
        this.isAuthenticated = false;
        this.router.navigateByUrl('/login');
    }
}
