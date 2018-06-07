import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Position } from './../_models/position.model';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Supplier } from '../_models/supplier.model';

@Injectable()
export class SupplierService {
  token = localStorage.getItem('token');
  headers = new Headers({'Authorization': 'Bearer ' + this.token});
  option = new RequestOptions({headers: this.headers});
  //headers.append('Content-type', 'application/json');
 
  constructor(private http: Http) { }

  getSuppliers() {
    return this.http.get(environment.baseurl + 'suppliers', this.option).map(response => {
      return <Supplier[]>response.json();
    });
  }

  updateSupplier(supplier: Supplier) {
    return this.http.put(environment.baseurl + 'suppliers/' + supplier.supplierId,supplier);
  }
  
}
