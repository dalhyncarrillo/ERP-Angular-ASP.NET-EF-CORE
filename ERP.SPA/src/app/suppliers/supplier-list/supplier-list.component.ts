import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';
import { Supplier } from '../../_models/supplier.model';
<<<<<<< HEAD
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SupplierCreateDialogComponent } from 'src/app/suppliers/supplier-create-dialog/supplier-create-dialog.component';
=======
import { MatPaginator, MatTableDataSource } from '@angular/material';
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790

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
<<<<<<< HEAD
  constructor(private supplierService: SupplierService, private dialog: MatDialog) {}
=======
  constructor(private supplierService: SupplierService) {}
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
  dataSource;
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {  
    this.getSuppliers();   
  }

<<<<<<< HEAD
  addSupplier() {
    let dialogRef = this.dialog.open(SupplierCreateDialogComponent, {
      height: '450px',
      width: '1700px',
    });
  }

=======
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
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
