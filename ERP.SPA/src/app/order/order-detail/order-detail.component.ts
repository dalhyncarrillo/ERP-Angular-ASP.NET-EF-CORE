import { OrderItems } from './../../_models/order-items.model';
import { OrderService } from './../../_services/order.service';
import { Order } from './../../_models/order.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnChanges {


  @Input() order: Order;
  orderItems: OrderItems[];
  constructor(private orderService: OrderService) { }

  ngOnChanges() {
   // this.getOrderDetails();
    this.getOrderitems();
  }

  getOrderDetails() {
    this.orderService.getOrderDetails(this.order.orderId).subscribe(data => {
      this.order = data;    
    });
  }

  getOrderitems() {
    this.orderService.getOrderItems(this.order.orderId).subscribe(data => {
      this.orderItems = data;
    });
  }
}
