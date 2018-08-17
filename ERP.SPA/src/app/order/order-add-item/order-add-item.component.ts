import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from '../../_services/item.service';
import { ItemSuppliers } from '../../_models/item-suppliers.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '../../../../node_modules/@angular/material';
import { Order } from '../../_models/order.model';
import { SelectionModel } from '../../../../node_modules/@angular/cdk/collections';
import { OrderItems } from '../../_models/order-items.model';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-order-add-item',
  templateUrl: './order-add-item.component.html',
  styleUrls: ['./order-add-item.component.css']
})
export class OrderAddItemComponent implements OnInit {

  constructor(private alertify: AlertifyService,
    private itemService: ItemService,
    public dialogRef: MatDialogRef<OrderAddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  itemSuppliers: ItemSuppliers[];
  itemsToOrder: OrderItems[] = this.data.orderItems;
  creationForm: FormGroup;


    displayedColumns = [
      "select",
      "itemId",
      "itemName",
      "unitCost",
      "quantity",
      "totalCost"
    ];
    dataSource;
    selection = new SelectionModel<OrderItems>(true, []);

  ngOnInit() {
    this.createOrderCreationForm();
    this.itemService.getItemsOfSupplier(this.data.order.supplierId).subscribe(data => {
      this.itemSuppliers = data;
    });
    this.dataSource = new MatTableDataSource<OrderItems>(this.itemsToOrder);
  }
 
  onUpdate() {
    this.dialogRef.close();
  }

  onItemSupplierSelected(itemSupplier: ItemSuppliers) {
    this.creationForm.get("unitCost").setValue(itemSupplier.unitCost);
  }
  createOrderCreationForm() {
    this.creationForm = new FormGroup({
      selectedItemSupplier: new FormControl("", [Validators.required]),
      unitCost: new FormControl({ value: "", disabled: true }, [Validators.required]),
      quantity: new FormControl("", [Validators.required]),
      totalCost: new FormControl({ value: "", disabled: true }, [Validators.required]),
    });
  }

  onAddItem() {
    let itemToBeAdded: OrderItems = {
      orderId: this.data.order.orderId,
      itemId: this.creationForm.get("selectedItemSupplier").value.itemId,
      quantity: this.creationForm.get("quantity").value,
      unitCost: this.creationForm.get("selectedItemSupplier").value.unitCost,
      totalCost:
        this.creationForm.get("quantity").value *
        this.creationForm.get("selectedItemSupplier").value.unitCost
    };
    if(this.doesItemsToOrderContainItem(itemToBeAdded)) {
      this.alertify.error('Item is already in the basket!');
    } else {
      this.itemsToOrder.push(itemToBeAdded);
    }
    this.dataSource = new MatTableDataSource<OrderItems>(this.itemsToOrder);
  }

  private doesItemsToOrderContainItem(itemToBeAdded: OrderItems) {
    let contains = false;
    this.itemsToOrder.forEach((itemsToOrder) => {
      if(itemsToOrder.itemId === itemToBeAdded.itemId) {
        contains =  true;
      }
    });
    return contains;
  }

  calculateTotalCost() {
    return this.itemsToOrder.map(t => t.totalCost).reduce((acc, value) => acc + value, 0);
  }
  onRemoveItem() {
    this.selection.selected.forEach(item => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(item), 1);

      this.dataSource = new MatTableDataSource<OrderItems>(this.dataSource.data);
    });
    this.selection = new SelectionModel<OrderItems>(true, []);
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

}
