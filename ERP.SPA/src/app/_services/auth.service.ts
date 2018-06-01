import { Position } from './../_models/position.model';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/*
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

*/

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    login(emp: any) {
        return this.http.post('http://localhost:5000/api/auth/login',emp);
    }

    getPositions() {
        return this.http.get('http://localhost:5000/api/auth/positions').map(response => { 
            return response.json()
        });
    }

    register(emp: any) {
        return this.http.post('http://localhost:5000/api/auth/register', emp);
    }
}
