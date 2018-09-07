import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Supplier } from '../../_models/supplier.model';
import { SupplierService } from '../../_services/supplier.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-supplier-create-dialog',
  templateUrl: './supplier-create-dialog.component.html',
  styleUrls: ['./supplier-create-dialog.component.css']
})
export class SupplierCreateDialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  supplierToSaveToDb: Supplier;
  constructor(private alertify: AlertifyService, private _formBuilder: FormBuilder, private supplierService: SupplierService, public dialogRef: MatDialogRef<SupplierCreateDialogComponent>) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      cityCtrl: ['', Validators.required],
      addressCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      contactNameCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required]
    });
  }

  addNewSupplier() {
    this.supplierToSaveToDb = {
      supplierId: 0,
      name: this.firstFormGroup.get('nameCtrl').value,
      city: this.secondFormGroup.get('cityCtrl').value,
      address: this.secondFormGroup.get('addressCtrl').value,
      contactName: this.thirdFormGroup.get('contactNameCtrl').value,
      phoneNumber: this.thirdFormGroup.get('phoneCtrl').value,
      lastUpdated: new Date(2018,6,9),
      status: 'Active',
    };
    this.supplierService.createSupplier(this.supplierToSaveToDb).subscribe(data  => {
      this.supplierToSaveToDb.supplierId = data['supplierId'];
    },
    error => {
      this.alertify.error('Error: ' + error);
    });
    this.dialogRef.close(this.supplierToSaveToDb);
  }

}