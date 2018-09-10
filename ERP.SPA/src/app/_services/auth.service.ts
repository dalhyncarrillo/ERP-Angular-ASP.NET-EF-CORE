import { Router } from '@angular/router';
import { Role } from './../_models/role.model';
import { HttpClient } from '@angular/common/http';
import { Position } from './../_models/position.model';
import {  Headers, RequestOptions, Response } from '@angular/http';
import { Injectable, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService implements OnChanges {

    NO_PERMISSION_ERROR_MESSAGE = 'You do NOT have permission for this operation!'
    decodedToken;
    employeeRoles: Role[];

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

    ngOnChanges() {
        
    }
    login(emp: any) {
        return this.http.post(environment.baseurl + 'auth/login',emp).map(token => {
        localStorage.setItem('token',token['tokenString']);
        this.employeeRoles = token['employeeCurrentRoles'];

        this.decodedToken = (this.jwtHelper.decodeToken(token['tokenString']));
        localStorage.setItem('positionId', this.decodedToken.role);
        localStorage.setItem('employeeId', this.decodedToken.nameid);
      });
    }

    getPositions() {
        return this.http.get<Position[]>(environment.baseurl + 'auth/positions');
    }

    getEmployeeRoles(employeeId: number) {
        return this.http.get<Role[]>(environment.baseurl + 'auth/roles/' + employeeId);
    }

    register(emp: any) {
        return this.http.post(environment.baseurl + 'auth/register', emp);
    }

    isLoggedIn() {
        return !this.jwtHelper.isTokenExpired();
    }

    DeleteEmployeeRole(employeeId: number, roleId: number) {
        return this.http.delete(environment.baseurl + 'auth/' + employeeId + '/' + roleId);
    }

    createEmployeeRole(employeeId: number, roleId: number) {
        return this.http.post(environment.baseurl + 'auth/employeerole', {employeeId, roleId});
    }
    GetRolesThatEmployeeNotHave(employeeId: number) {
        return this.http.get<Role[]>(environment.baseurl + 'auth/availableroles/' + employeeId);
    }

    isPurchaseAllowed() {
        this.checkIfEmployeeRolesLoadedCorrectly();
        let isAllowed = false;
        this.employeeRoles.forEach(role => {
            if(role.roleId === 1 || role.roleId === 2){
                isAllowed = true;
            }
        });
        return isAllowed;
    }

    isApproveAllowed() {
        this.checkIfEmployeeRolesLoadedCorrectly();
        let isAllowed = false;
        this.employeeRoles.forEach(role => {
            if(role.roleId === 2){
                isAllowed = true;
            }
        });
        return isAllowed;
    }

    isReceiveAllowed() {
        this.checkIfEmployeeRolesLoadedCorrectly();
        let isAllowed = false;
        this.employeeRoles.forEach(role => {
            if(role.roleId === 3 || role.roleId === 2){
                isAllowed = true;
            }
        });
        return isAllowed;
    }

    isReadEmployeeDataAllowed() {
        this.checkIfEmployeeRolesLoadedCorrectly();
        let isAllowed = false;
        this.employeeRoles.forEach(role => {
            if(role.roleId === 4 || role.roleId === 5){
                isAllowed = true;
            }
        });
        return isAllowed;
    }

    isUpdateEmployeeDataAllowed() {
        this.checkIfEmployeeRolesLoadedCorrectly();
        let isAllowed = false;
        this.employeeRoles.forEach(role => {
            if(role.roleId === 5){
                isAllowed = true;
            }
        });
        return isAllowed;
    }

    checkIfEmployeeRolesLoadedCorrectly() {
        if(this.employeeRoles == null) {
            localStorage.removeItem('token');
            this.router.navigate(['']);
        }
    }
}
