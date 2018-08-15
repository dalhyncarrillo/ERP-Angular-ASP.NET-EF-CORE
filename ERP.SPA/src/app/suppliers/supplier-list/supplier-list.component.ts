import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';
import { Supplier } from '../../_models/supplier.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  suppliers:Supplier[];
 
  displayedColumns = ['supplierId', 'name', 'status'];

  selectedSupplier;
  constructor(private supplierService: SupplierService) {}
  dataSource;
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {  
    this.getSuppliers();   
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
    this.dataSource.paginator = this.paginator;
  }

  
  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => {
    this.suppliers = data;
    this.setDataSource();  
    });
  }

  onSupplier(supplier: any) {
    this.selectedSupplier = supplier;
  }

  deleteSupplier(supplier: Supplier) {
    const index: number = this.suppliers.indexOf(supplier);
    if (index !== -1) {
        this.suppliers.splice(index, 1);
        this.selectedSupplier = null;
    }    
  }
}
