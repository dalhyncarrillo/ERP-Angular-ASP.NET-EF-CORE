import { AlertifyService } from './../../_services/alertify.service';
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

  constructor(private orderService: OrderService, private alertifyService: AlertifyService) { }

  ngOnChanges() {
    console.log('getOrderDetail: ' + this.order);
   // this.getOrderDetails();
  }

  getStatusOfOrder() {
    return this.order.status;
  }

  getOrderDetails() {

    this.orderService.getOrderDetails(this.order.orderId).subscribe(data => {
      console.log('getOrderDetail DATA: ' + data);
      this.order = data;    
    });
  }

  onApproveOrder() {
    this.order.status = 'Approved';
    this.orderService.updateOrder(this.order).subscribe(data => {
      if(data['status'] === 'Approved') {
        this.alertifyService.success('Order approved successfully');
      }
    });
  }

  //TODO IMPLEMENT
  onReceiveOrder() {
    console.log('order received');
  }
}
