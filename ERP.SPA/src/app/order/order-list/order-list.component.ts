import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { OrderCreateDialogComponent } from './../order-create-dialog/order-create-dialog.component';
import { OrderService } from './../../_services/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { Order } from '../../_models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  orders: Order[];
 
  displayedColumns = ['orderId',  'status', 'supplierName', 'requestedDate', 'totalCost'];

  selectedOrder;
  constructor(private orderService: OrderService, private dialog: MatDialog, private authService: AuthService, private alertifyService: AlertifyService) {}
  dataSource = new MatTableDataSource<Order>();
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {  
    this.getOrders();   
  }

  getOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.setDataSource();  
    });
  }

  setDataSource() {
    this.dataSource.data = this.orders;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onOrderSelected(order: any) {
    this.selectedOrder = order;
  }


  addOrder() {
    if(this.authService.isPurchaseAllowed()) {
      let dialogRef = this.dialog.open(OrderCreateDialogComponent, {
        height: '1700px',
        width: '1700px',
      }).afterClosed().subscribe(result => {
        if(result != null) {
          this.orders.push(result);
          this.setDataSource();
        }
      });

    } else {
      this.alertifyService.error(this.authService.NO_PERMISSION_ERROR_MESSAGE);
    }
  }

  orderDeleted(order: Order) {
    this.orders.splice(this.orders.indexOf(order), 1);
    this.selectedOrder = null;
    this.setDataSource();
  }
}
