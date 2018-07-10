import { ItemSuppliers } from './../_models/item-suppliers.model';
import { Item } from './../_models/item.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(environment.baseurl + 'items');
  }

  getItem(itemId: number) {
    return this.http.get<Item>(environment.baseurl + 'items/' + itemId);
  }

  getItemSuppliers(itemId: number) {
    return this.http.get<ItemSuppliers[]>(environment.baseurl + 'itemSuppliers/' + itemId);
  }

  createItem(itemToCreate) {
    return this.http.post(environment.baseurl + 'items', itemToCreate);
  }

  createItemSuppliers(itemSuppliersToCreate) {
    return this.http.post(environment.baseurl + 'itemSuppliers', itemSuppliersToCreate);
  }
}
