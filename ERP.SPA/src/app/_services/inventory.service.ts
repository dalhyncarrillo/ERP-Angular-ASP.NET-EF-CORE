import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: Http) { }

  getItems() {
    this.http
  }
}

