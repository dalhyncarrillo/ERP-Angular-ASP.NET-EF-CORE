import { ItemCreateDialogComponent } from './../item-create-dialog/item-create-dialog.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../_services/item.service';
import { Item } from '../../_models/item.model';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  items: Item[];
 
  displayedColumns = ['itemId', 'name', 'retailPrice', 'quantityOnHand'];

  selectedItem;
  constructor(private itemService: ItemService, private dialog: MatDialog) {}
  dataSource;
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {  
    this.getItems();   
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Item>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  getItems() {
    this.itemService.getItems().subscribe(data => {
    this.items = data;
    this.setDataSource();  
    });
  }

  onItem(item: any) {
    this.selectedItem = item;
  }


  addItem() {
      let dialogRef = this.dialog.open(ItemCreateDialogComponent, {
      height: '450px',
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
