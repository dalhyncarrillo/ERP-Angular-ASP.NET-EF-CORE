import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Position } from './../_models/position.model';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SupplierService {

  constructor(private http: Http) { }

  getSuppliers() {
    return this.http.get(environment.baseurl + 'suppliers').map(response => {
      return response.json();
    });
  }
  
}
