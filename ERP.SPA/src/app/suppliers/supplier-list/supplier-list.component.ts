
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';
import { Supplier } from '../../_models/supplier.model';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SupplierCreateDialogComponent } from 'src/app/suppliers/supplier-create-dialog/supplier-create-dialog.component';

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
  constructor(private supplierService: SupplierService, private dialog: MatDialog) {}
  dataSource = new MatTableDataSource<Supplier>();
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {  
    this.getSuppliers();   
  }

  addSupplier() {
    let dialogRef = this.dialog.open(SupplierCreateDialogComponent, {
      height: '450px',
      width: '1700px',
    }).afterClosed().subscribe(result => {
      if(result != null) {
        this.suppliers.push(result);
        this.setDataSource();
      }
    });
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => {
    this.suppliers = data;
    this.setDataSource();  
    });
  }

  setDataSource() {
    this.dataSource.data = this.suppliers;
    this.dataSource.paginator = this.paginator;
  }

  onSupplier(supplier: any) {
    this.selectedSupplier = supplier;
  }

  updateSupplier(updatedSupplier: Supplier) {
    for (let index = 0; index < this.suppliers.length; index++) {
      const element = this.suppliers[index];
      if(element.supplierId === updatedSupplier.supplierId)
        this.suppliers[index] = updatedSupplier;
    }
    this.setDataSource();
  }
}