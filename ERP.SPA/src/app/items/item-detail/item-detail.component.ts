import { ItemSuppliersCreateDialogComponent } from './../item-suppliers-create-dialog/item-suppliers-create-dialog.component';
import { ItemSuppliers } from './../../_models/item-suppliers.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ItemService } from './../../_services/item.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Item } from './../../_models/item.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item;
  itemSuppliers: ItemSuppliers[];
  constructor(private aleritfyService: AlertifyService, private itemService: ItemService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.getItem();
    this.getSuppliers();
  }

  getItem() {
    this.itemService.getItem(this.item.itemId).subscribe((item: Item) => {
      this.item = item;
    });
  }
   getSuppliers() {
    this.itemService.getItemSuppliers(this.item.itemId).subscribe(data => {
      this.itemService.itemSuppliers = data;
      this.itemSuppliers = this.itemService.itemSuppliers;
    });
 }
 addSupplier() {
  let dialogRef = this.dialog.open(ItemSuppliersCreateDialogComponent, {
    height: '450px',
    width: '1700px',
    data: this.item 
  });
   
 }

  updateItem() {

  }

  deleteItem() {

  }

  // updateSupplier() {
  //   this.supplierService.updateSupplier(this.supplier).subscribe( data => {
  //   });
  // }

  // deleteSupplier() {
  //   let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     height: '450px',
  //     width: '700px',
  //     data: { message: 'Are you sure you want to delete?\n' + this.supplier.name}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result === 'yes') {
  //       this.supplierService.deleteSupplier(this.supplier).subscribe(data => {
  //           this.supplierDeleted.emit(this.supplier);
  //       });
  //     }
  //   });
  // }
}
