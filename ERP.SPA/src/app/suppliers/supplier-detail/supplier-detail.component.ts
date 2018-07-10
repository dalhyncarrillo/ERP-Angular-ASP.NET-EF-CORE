import { ConfirmationDialogComponent } from './../../ConfirmationDialog/ConfirmationDialog.component';
import { AlertifyService } from './../../_services/alertify.service';
import { SupplierCreateDialogComponent } from './../supplier-create-dialog/supplier-create-dialog.component';
import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Supplier } from '../../_models/supplier.model';
import { SupplierService } from '../../_services/supplier.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit, OnChanges {

  @Output() supplierDeleted = new EventEmitter<Supplier>(); 
  @Input() supplier: Supplier;
  constructor(private aleritfyService: AlertifyService, private supplierService: SupplierService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.getSupplier();
  }

  updateSupplier() {
    this.supplierService.updateSupplier(this.supplier).subscribe( data => {
    });
  }

  addSupplier() {
    let dialogRef = this.dialog.open(SupplierCreateDialogComponent, {
      height: '450px',
      width: '1700px',
    });
  }

  deleteSupplier() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '250px',
      width: '500px',
      data: { message: 'Are you sure you want to delete?\n' + this.supplier.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes') {
        this.supplierService.deleteSupplier(this.supplier).subscribe(data => {
            this.supplierDeleted.emit(this.supplier);
        });
      }
    });
  }

  getSupplier() {
    this.supplierService.getSupplier(this.supplier.supplierId).subscribe((supplierDetail: Supplier) => {
      this.supplier.city = supplierDetail.city;
      this.supplier.address = supplierDetail.address;
      this.supplier.contactName = supplierDetail.contactName;
      this.supplier.phoneNumber = supplierDetail.phoneNumber;
    });
  }

}
