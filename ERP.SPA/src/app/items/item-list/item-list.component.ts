import { ItemCreateDialogComponent } from './../item-create-dialog/item-create-dialog.component';
import { ItemService } from '../../_services/item.service';
import { Item } from '../../_models/item.model';

import { Component, OnInit, ViewChild } from '@angular/core';
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
 
  displayedColumns = ['itemId', 'name', 'retailPrice', 'quantityOnHand', 'status'];

  selectedItem;
  constructor(private itemService: ItemService, private dialog: MatDialog) {}
  dataSource = new MatTableDataSource<Item>();
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {  
    this.getItems();   
  }

  getItems() {
    this.itemService.getItems().subscribe(data => {
    this.items = data;
    this.setDataSource();  
    });
  }
  
  setDataSource() {
    this.dataSource.data = this.items;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onItem(item: any) {
    this.selectedItem = item;
  }

  addItem() {
      let dialogRef = this.dialog.open(ItemCreateDialogComponent, {
      height: '450px',
      width: '1700px',
    }).afterClosed().subscribe(result => {
      if(result != null) {
        this.items.push(result);
        this.setDataSource();
      }
    });
  }
}
