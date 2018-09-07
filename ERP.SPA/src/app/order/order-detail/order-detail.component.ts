import { AlertifyService } from './../../_services/alertify.service';
import { OrderItems } from './../../_models/order-items.model';
import { OrderService } from './../../_services/order.service';
import { Order } from './../../_models/order.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SELECT_VALUE_ACCESSOR } from '../../../../node_modules/@angular/forms/src/directives/select_control_value_accessor';

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
    console.log(this.order);
    this.getOrderDetails();
  }

  getStatusOfOrder() {
    return this.order.status;
  }

  getOrderDetails() {

    this.orderService.getOrderDetails(this.order.orderId).subscribe(data => {
      this.order = data;    
    });
  }

  onApproveOrder() {
    this.order.approvedBy = +localStorage.getItem('employeeId');
    this.orderService.approveOrder(this.order).subscribe((success: Order) => {
      if(success.status === 'Approved') {
        this.order = success;
        this.alertifyService.success('Order approved successfully');
      }
    },
    error => {
        this.alertifyService.error('Error: ' + error.error);
    });
  }

  onReceiveOrder() {
    this.orderService.receiveOrder(this.order).subscribe((success: Order) => {
      if(success.status === 'Received') {
        this.order = success;
        this.alertifyService.success('Order received successfully');
      }
    },
    error => {
      this.alertifyService.error('Error: ' + error.error);
    });
  }
}
