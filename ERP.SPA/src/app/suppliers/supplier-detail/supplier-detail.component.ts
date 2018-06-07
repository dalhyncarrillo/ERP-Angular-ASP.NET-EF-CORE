import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Supplier } from '../../_models/supplier.model';
import { SupplierService } from '../../_services/supplier.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

  @Input() supplier: Supplier;
  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
  }

  updateSupplier() {
    this.supplierService.updateSupplier(this.supplier).subscribe( data => {
      console.log(data);
    });
  }

}
