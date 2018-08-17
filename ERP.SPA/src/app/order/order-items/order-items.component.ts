import { AlertifyService } from 'src/app/_services/alertify.service';
import { ConfirmationDialogComponent } from './../../ConfirmationDialog/ConfirmationDialog.component';
import { MatDialog } from '@angular/material';
import { OrderService } from './../../_services/order.service';
import { OrderItems } from './../../_models/order-items.model';
import { Order } from './../../_models/order.model';
import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { ItemService } from '../../_services/item.service';
import { ItemSuppliers } from '../../_models/item-suppliers.model';
import { OrderAddItemComponent } from '../order-add-item/order-add-item.component';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnChanges {

  @Input() order: Order;
  orderItems: OrderItems[] = [];
  itemSuppliers: ItemSuppliers[];
  changeOccured: boolean = false;

  constructor(private alertify: AlertifyService , private orderService: OrderService, private itemService: ItemService,private dialog: MatDialog) { }

  ngOnChanges() {
    // this.getOrderDetails();
    this.changeOccured = false;
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

  getOrderTotalCost() {
    return this.orderItems.map(t => t.totalCost).reduce((acc, value) => acc + value, 0);
  }

  onAddItem() {
    this.changeOccured = true;
    let dialogRef = this.dialog.open(OrderAddItemComponent, {
      height: '800px',
      width: '1200px',
      data: {order: this.order, orderItems: this.orderItems}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onDeleteItem(orderItem: OrderItems ) {
    this.changeOccured = true;

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '250px',
      width: '500px',
      data: { message: 'Are you sure you want to delete?\n' + orderItem.itemId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes') {
          this.orderItems.splice(this.orderItems.findIndex(element => element.itemId === orderItem.itemId), 1);
      }
    });
  }

  onSaveChanges() {
    if(this.orderItems.length == 0) {
      this.alertify.error('Error: Your BASKET is empty!');
    } else {
      this.orderService.updateOrderItem(this.orderItems, this.order.orderId).subscribe( data => {
        this.order.totalCost = this.getOrderTotalCost();
        
        this.orderService.updateOrder(this.order).subscribe(data => {
          this.alertify.success('Your order has been successfully UPDATED!');   
        },error => {
          this.alertify.error('Error: ' + error.error);
        });
      });
    }
  }
}
