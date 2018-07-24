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

  registerForm: FormGroup;
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

  constructor(
    private supplierService: SupplierService,
    private itemService: ItemService
  ) {}

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
    this.registerForm = new FormGroup({
      supplier: new FormControl("", [Validators.required]),
      requestDate: new FormControl(new Date().toISOString(), [
        Validators.required
      ]),
      selectedItemSupplier: new FormControl("", [Validators.required]),
      unitCost: new FormControl({ value: "", disabled: true }, [
        Validators.required
      ]),
      quantity: new FormControl("", [Validators.required]),
      totalCost: new FormControl({ value: "", disabled: true }, [
        Validators.required
      ])
    });
  }
  onAddItem() {
    let itemToBeAdded: OrderItems = {
      itemId: this.registerForm.get("selectedItemSupplier").value.itemId,
      orderId: 2,
      quantity: this.registerForm.get("quantity").value,
      unitCost: this.registerForm.get("selectedItemSupplier").value.unitCost,
      totalCost:
        this.registerForm.get("quantity").value *
        this.registerForm.get("selectedItemSupplier").value.unitCost
    };
    this.itemsToOrder.push(itemToBeAdded);
    this.dataSource = new MatTableDataSource<OrderItems>(this.itemsToOrder);
  }

  onRemoveItem() {
    this.selection.selected.forEach(item => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(item), 1);

      this.dataSource = new MatTableDataSource<OrderItems>(this.dataSource.data);
    });
    this.selection = new SelectionModel<OrderItems>(true, []);
  }

  supplierSelected(supplier: Supplier) {
    this.itemService.getItemsOfSupplier(supplier.supplierId).subscribe(data => {
      this.itemSuppliers = data;
    });
  }
  onItemSupplierSelected(itemSupplier: ItemSuppliers) {
    this.registerForm.get("unitCost").setValue(itemSupplier.unitCost);
  }
  onSubmit() {
    console.log(this.registerForm.get("requestDate").value);
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
