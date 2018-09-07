
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
      this.suppliers.push(result);
      this.setDataSource();
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

  deleteSupplier(supplier: Supplier) {
    const index: number = this.suppliers.indexOf(supplier);
    if (index !== -1) {
        this.suppliers.splice(index, 1);
        this.selectedSupplier = null;
        this.setDataSource();
    }    
  }
}