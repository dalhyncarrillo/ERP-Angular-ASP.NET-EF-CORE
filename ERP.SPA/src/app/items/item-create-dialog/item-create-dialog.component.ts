import { Supplier } from './../../_models/supplier.model';
import { MatDialogRef } from '@angular/material';
import { ItemService } from './../../_services/item.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';

@Component({
  selector: 'app-item-create-dialog',
  templateUrl: './item-create-dialog.component.html',
  styleUrls: ['./item-create-dialog.component.css']
})
export class ItemCreateDialogComponent implements OnInit {

  suppliers: Supplier[];
  itemToSave:any = {};í

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private supplierService: SupplierService,private itemService: ItemService, public dialogRef: MatDialogRef<ItemCreateDialogComponent>) { }

  ngOnInit() {
    this.getSuppliers();
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      retailPriceCtrl: ['', Validators.required],
      unitCostCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      supplierCtrl: ['', Validators.required],
      leadTimeCtrl: ['', Validators.required]
    });
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }
  addNewItem() {
    this.itemToSave = {
      name: this.firstFormGroup.get('nameCtrl').value,
      retailPrice: this.secondFormGroup.get('retailPriceCtrl').value,
      unitCost: this.secondFormGroup.get('unitCostCtrl').value,
      supplierId: this.thirdFormGroup.get('supplierCtrl').value.supplierId,
      leadTime: this.thirdFormGroup.get('leadTimeCtrl').value,
      isPrimary: true,
      quantityOnHand: 0,
      quantityOrdered: 0,
      lastUpdated: new Date(2018,6,9),
    };
    this.itemService.createItem(this.itemToSave).subscribe(data => {
      this.itemToSave.itemId = data['itemId'];
      this.addNewItemSuppliers();
    },
    error => {
      console.log(error);
    });
    this.dialogRef.close();
  }

  addNewItemSuppliers() {
    this.itemService.createItemSuppliers(this.itemToSave).subscribe();
  }

}
