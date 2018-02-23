import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Router} from "@angular/router";
import {User} from "../../models/user";


@Injectable()
export class AuthService {

    public isAuthenticated:boolean;
    public user: User;


    constructor(private http: HttpClient, private router: Router) {
        this.isAuthenticated = !!window.localStorage.getItem('loginToken');
        this.user = JSON.parse(window.localStorage.getItem('user'));

    }

    public getRequestHeaders() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'));
    }

    login(email: string, password: string) {
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/login', {
                'email': email,
                'password': password
            }).subscribe((data: { token: string, user: User }) => {
                window.localStorage.setItem('loginToken', data.token);
                window.localStorage.setItem('user', JSON.stringify(data.user));
                this.user = new User(data.user.id,data.user.first_name,data.user.last_name);
                this.isAuthenticated = true;
                o.next(data.token);
                return o.complete();
            }, (error) => {
                return o.error(error);
            });
        });
    }

    register(first_name: string, last_name:string, email: string, password: string) {
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
        window.localStorage.removeItem('user');
        this.isAuthenticated = false;
        this.router.navigateByUrl('/login');
    }
}
