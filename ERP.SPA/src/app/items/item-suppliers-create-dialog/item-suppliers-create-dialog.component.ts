import { AlertifyService } from './../../_services/alertify.service';
import { Supplier } from './../../_models/supplier.model';
import { ItemService } from './../../_services/item.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SupplierService } from './../../_services/supplier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Item } from 'src/app/_models/item.model';
import { ItemSuppliers } from '../../_models/item-suppliers.model';

@Component({
  selector: 'app-item-suppliers-create-dialog',
  templateUrl: './item-suppliers-create-dialog.component.html',
  styleUrls: ['./item-suppliers-create-dialog.component.css']
})
export class ItemSuppliersCreateDialogComponent implements OnInit {

  suppliers: Supplier[];
  itemToSave:any = {};

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  constructor(private alertifyService: AlertifyService,
              private _formBuilder: FormBuilder, 
              private supplierService: SupplierService, 
              private itemService: ItemService, 
              public dialogRef: MatDialogRef<ItemSuppliersCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public item: Item) { }

  ngOnInit() {
    this.getSuppliers();
    this.firstFormGroup = this._formBuilder.group({
      supplierCtrl: ['', Validators.required],
      leadTimeCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      retailPriceCtrl: ['', Validators.required],
      unitCostCtrl: ['', Validators.required]
    });
 
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }
  createNewItemSupplier() {
    let itemSupplierToCreate = {
      itemId: this.item.itemId,
      itemName: this.item.name,
      supplierId: this.firstFormGroup.get('supplierCtrl').value.supplierId,
      supplierName: this.firstFormGroup.get('supplierCtrl').value.name,
      leadTime: this.firstFormGroup.get('leadTimeCtrl').value,

      retailPrice: this.secondFormGroup.get('retailPriceCtrl').value,
      unitCost: this.secondFormGroup.get('unitCostCtrl').value,
      isPrimary: false
    }

    this.itemService.createItemSuppliers(itemSupplierToCreate).subscribe(
      data => {
        this.alertifyService.success('Supplier added to the item!');
        this.itemService.itemSuppliers.push(itemSupplierToCreate);
      },
      error => {
        this.alertifyService.error('This supplier already belongs to the item!');
      });
    this.dialogRef.close();
  }
}
