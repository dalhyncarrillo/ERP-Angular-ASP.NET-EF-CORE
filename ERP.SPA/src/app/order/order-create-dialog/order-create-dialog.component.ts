import { OrderService } from './../../_services/order.service';
import { Order } from './../../_models/order.model';
import { MatTableDataSource } from "@angular/material";
import { OrderItems } from "./../../_models/order-items.model";
import { ItemSuppliers } from "./../../_models/item-suppliers.model";
import { Item } from "src/app/_models/item.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Supplier } from "./../../_models/supplier.model";
import { Component, OnInit } from "@angular/core";
import { SupplierService } from "../../_services/supplier.service";
import { ItemService } from "../../_services/item.service";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-order-create-dialog",
  templateUrl: "./order-create-dialog.component.html",
  styleUrls: ["./order-create-dialog.component.css"]
})
export class OrderCreateDialogComponent implements OnInit {
  suppliers: Supplier[];
  itemSuppliers: ItemSuppliers[];
  itemsToOrder: OrderItems[] = [];

  creationForm: FormGroup;
  today = new Date();
  minRequestDate = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 1
  );
  maxRequestDate = new Date(
    this.today.getFullYear(),
    this.today.getMonth() + 3,
    this.today.getDate()
  );

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

  constructor(private supplierService: SupplierService, private itemService: ItemService, private orderService: OrderService) {}

  ngOnInit() {
    this.getSuppliers();
    this.createOrderCreationForm();
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  createOrderCreationForm() {
    this.creationForm = new FormGroup({
      supplier: new FormControl("", [Validators.required]),
      requestDate: new FormControl(new Date().toISOString(), [Validators.required]),
      selectedItemSupplier: new FormControl("", [Validators.required]),
      unitCost: new FormControl({ value: "", disabled: true }, [Validators.required]),
      quantity: new FormControl("", [Validators.required]),
      totalCost: new FormControl({ value: "", disabled: true }, [Validators.required]),
  //    orderItemsTable: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    let orderToCreate: Order = {
      orderId: 0,
      supplierId: this.creationForm.get('supplier').value.supplierId,
      supplierName: this.creationForm.get('supplier').value.name,
      status: 'Requested',
      totalCost: this.calculateTotalCost(),
      requestedDate: this.creationForm.get('requestDate').value,
      createdBy: 2,
      receivedDate: null,
      approvedBy: null
    };

    this.orderService.createOrder(orderToCreate).subscribe(data => {
      console.log(data);
      this.orderService.createOrderItem(this.itemsToOrder).subscribe( data => {
      });
    },
    error => {
      console.log(error);
    });
    console.log(orderToCreate);
  }
  onSupplierSelected(supplier: Supplier) {
    this.itemService.getItemsOfSupplier(supplier.supplierId).subscribe(data => {
      this.itemSuppliers = data;
    });
    
    if(this.dataSource !== undefined) {
      this.dataSource.data.splice(0, this.dataSource.data.length);
      this.dataSource = new MatTableDataSource<OrderItems>();
    }
  }

  onItemSupplierSelected(itemSupplier: ItemSuppliers) {
    this.creationForm.get("unitCost").setValue(itemSupplier.unitCost);
  }

  onAddItem() {
    let itemToBeAdded: OrderItems = {
      itemId: this.creationForm.get("selectedItemSupplier").value.itemId,
      orderId: 2,
      quantity: this.creationForm.get("quantity").value,
      unitCost: this.creationForm.get("selectedItemSupplier").value.unitCost,
      totalCost:
        this.creationForm.get("quantity").value *
        this.creationForm.get("selectedItemSupplier").value.unitCost
    };
    this.itemsToOrder.push(itemToBeAdded);
    this.dataSource = new MatTableDataSource<OrderItems>(this.itemsToOrder);
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
