import { ConfirmationDialogComponent } from './../../ConfirmationDialog/ConfirmationDialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from './../../_services/alertify.service';
import { OrderItems } from './../../_models/order-items.model';
import { OrderService } from './../../_services/order.service';
import { Order } from './../../_models/order.model';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SELECT_VALUE_ACCESSOR } from '../../../../node_modules/@angular/forms/src/directives/select_control_value_accessor';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnChanges {


  @Input() order: Order;
  orderItems: OrderItems[];
  @Output() orderDeletedEvent = new EventEmitter<Order>();

  constructor(private authService: AuthService, private orderService: OrderService, private alertifyService: AlertifyService, private dialog: MatDialog) { }

  ngOnChanges() {
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

  onDeleteOrder() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '250px',
      width: '500px',
      data: { message: 'Are you sure you want to delete this order?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes') {
        this.orderService.deleteOrder(this.order).subscribe(success => {
          this.orderDeletedEvent.emit(this.order);
        },
        error => {
          this.alertifyService.error(error.error);
        })
      }
    });
  }

  onApproveOrder() {
    if(this.authService.isApproveAllowed()) {
      this.approveOrder();
    } else {
      this.alertifyService.error('noPermission');
    }
  }

  private approveOrder() {
    this.order.approvedBy = +localStorage.getItem('employeeId');
    this.orderService.approveOrder(this.order).subscribe((success: Order) => {
      if(success.status === 'Approved') {
        this.order.status = success.status;
        this.order.timestamp = success.timestamp;
        this.alertifyService.success('orderApprovedSuccess');
      }
    },
    error => {
        this.alertifyService.error(error.error);
    });
  }

  onReceiveOrder() {
    if(this.authService.isReceiveAllowed()) {
      this.receiveOrder();
    } else {
      this.alertifyService.error('noPermission');
    } 
  }

  private receiveOrder() {
    this.orderService.receiveOrder(this.order).subscribe((success: Order) => {
      if(success.status === 'Received') {
        this.order.status = success.status;
        this.order.receivedDate = success.receivedDate;
        this.order.timestamp = success.timestamp;
        this.alertifyService.success('orderReceivedSuccess');
      }
    },
    error => {
      this.alertifyService.error(error.error);
    });
  }

  isDeletableOrder() {
     if( (this.getStatusOfOrder() ==='Requested') && (this.order.createdBy === +localStorage.getItem('employeeId'))) {
        return true;
     }
     return false;
  }
}
