import { HttpClient } from '@angular/common/http';
import { Position } from './../_models/position.model';
import {  Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

/*
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

*/

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    login(emp: any) {
        return this.http.post(environment.baseurl + 'auth/login',emp).map(token => {
        localStorage.setItem('token',token['tokenString']);
      });
    }

    getPositions() {
        return this.http.get<Position[]>(environment.baseurl + 'auth/positions');
    }

    register(emp: any) {
        return this.http.post(environment.baseurl + 'auth/register', emp);
    }

    isLoggedIn() {
        var token =  localStorage.getItem('token');
        if(token === null) {
          return true;
        }
        return false;
    }
}
