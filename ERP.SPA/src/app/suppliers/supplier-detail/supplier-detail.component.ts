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
export class SupplierDetailComponent implements OnChanges {

  @Output() supplierUpdated = new EventEmitter<Supplier>(); 
  @Input() supplier: Supplier;

  statuses = ['Active', 'Inactive'];
  selectedStatus: string;
  constructor(private aleritfyService: AlertifyService, private supplierService: SupplierService, private dialog: MatDialog, private router: Router) { }

  ngOnChanges() {
    this.getSupplier();
  }
  getSupplier() {
    
    this.supplierService.getSupplier(this.supplier.supplierId).subscribe((supplierDetail: Supplier) => {
      this.supplier = supplierDetail;
    });

  }
  updateSupplier() {
    this.supplierService.updateSupplier(this.supplier).subscribe((updatedSupplier: Supplier) => {
      this.supplier = updatedSupplier;
      this.aleritfyService.success('updateSuccess');
      this.supplierUpdated.emit(updatedSupplier);
    },
    error => {
      this.aleritfyService.error('Error: ' + error.error);
      this.getSupplier();
    });
  }


}
