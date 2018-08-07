import { ConfirmationDialogComponent } from './../../ConfirmationDialog/ConfirmationDialog.component';
import { MatDialog } from '@angular/material';
import { OrderService } from './../../_services/order.service';
import { OrderItems } from './../../_models/order-items.model';
import { Order } from './../../_models/order.model';
import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnChanges {

  @Input() order: Order;
  orderItems: OrderItems[];

  constructor(private orderService: OrderService, private dialog: MatDialog) { }

  ngOnChanges() {
    // this.getOrderDetails();
     this.getOrderitems();
   }

  getOrderitems() {
     this.orderService.getOrderItems(this.order.orderId).subscribe(data => {
       this.orderItems = data;
     });
   }

  getStatusOfOrder() {
    return this.order.status;
  }

  onDeleteItem(orderItem: OrderItems ) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '250px',
      width: '500px',
      data: { message: 'Are you sure you want to delete?\n' + orderItem.itemId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes') {
        this.orderService.removeOrderItem(orderItem.orderId, orderItem.itemId).subscribe(data => {
            console.log(data);
        });
      }
    });
  }

}
