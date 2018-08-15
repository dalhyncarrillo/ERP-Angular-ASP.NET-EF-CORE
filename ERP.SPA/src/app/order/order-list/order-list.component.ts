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
  constructor(private orderService: OrderService, private dialog: MatDialog) {}
  dataSource;
  
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
    this.dataSource = new MatTableDataSource<Order>(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onOrderSelected(order: any) {
    this.selectedOrder = order;
    console.log(this.selectedOrder);
  }


  addOrder() {
    let dialogRef = this.dialog.open(OrderCreateDialogComponent, {
      height: '1700px',
      width: '1700px',
    });
  }


  // deleteSupplier(supplier: Supplier) {
  //   const index: number = this.suppliers.indexOf(supplier);
  //   if (index !== -1) {
  //       this.suppliers.splice(index, 1);
  //       this.selectedSupplier = null;
  //   }    
  // }

}
