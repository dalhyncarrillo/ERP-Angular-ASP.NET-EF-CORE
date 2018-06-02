import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  suppliers:any [];
  selectedSupplier;
  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    this.getSuppliers();
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  onSupplier(supplier: any) {
    this.selectedSupplier = supplier;
  }

}
