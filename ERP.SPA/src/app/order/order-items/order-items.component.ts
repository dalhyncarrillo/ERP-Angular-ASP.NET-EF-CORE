import { ConfirmationDialogComponent } from './../../ConfirmationDialog/ConfirmationDialog.component';
import { MatDialog } from '@angular/material';
import { OrderService } from './../../_services/order.service';
import { OrderItems } from './../../_models/order-items.model';
import { Order } from './../../_models/order.model';
<<<<<<< HEAD
import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { ItemService } from '../../_services/item.service';
import { ItemSuppliers } from '../../_models/item-suppliers.model';
import { OrderAddItemComponent } from '../order-add-item/order-add-item.component';
=======
import { Component, OnChanges, Input } from '@angular/core';
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnChanges {

  @Input() order: Order;
  orderItems: OrderItems[];
<<<<<<< HEAD
  itemSuppliers: ItemSuppliers[];
  changeOccured: boolean = false;

  constructor(private orderService: OrderService, private itemService: ItemService,private dialog: MatDialog) { }

  ngOnChanges() {
    // this.getOrderDetails();
    this.changeOccured = false;
    this.getOrderitems();
=======

  constructor(private orderService: OrderService, private dialog: MatDialog) { }

  ngOnChanges() {
    // this.getOrderDetails();
     this.getOrderitems();
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
   }

  getOrderitems() {
     this.orderService.getOrderItems(this.order.orderId).subscribe(data => {
       this.orderItems = data;
     });
   }

  getStatusOfOrder() {
    return this.order.status;
  }

<<<<<<< HEAD
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

=======
  onDeleteItem(orderItem: OrderItems ) {
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '250px',
      width: '500px',
      data: { message: 'Are you sure you want to delete?\n' + orderItem.itemId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes') {
<<<<<<< HEAD
          this.orderItems.splice(this.orderItems.findIndex(element => element.itemId === orderItem.itemId), 1);
=======
        this.orderService.removeOrderItem(orderItem.orderId, orderItem.itemId).subscribe(data => {
            console.log(data);
        });
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
      }
    });
  }

<<<<<<< HEAD
  onUpdateChanges() {

  }

=======
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
}
