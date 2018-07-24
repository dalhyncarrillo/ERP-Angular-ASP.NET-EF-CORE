import { OrderItems } from './../_models/order-items.model';
import { Order } from './../_models/order.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(environment.baseurl + 'Orders');
  }

  getOrderDetails(orderId: number) {
    return this.http.get<Order>(environment.baseurl + 'Orders/' + orderId);
  }
  getOrderItems(orderId: number) {
    return this.http.get<OrderItems[]>(environment.baseurl + 'OrderItems/' + orderId);
  }
}
