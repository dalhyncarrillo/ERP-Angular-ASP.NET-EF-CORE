import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { MatPaginator, MatDialog, MatTableDataSource, MatSort } from '../../../../node_modules/@angular/material';
import { Employee } from '../../_models/employee.model';
import { EmployeeService } from '../../_services/employee.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private alertify: AlertifyService, private router: Router, private employeeService: EmployeeService, private dialog: MatDialog) {}

  createEmployee() {
    this.router.navigate(['register']);
  }


  employees:Employee[];
 
  displayedColumns = ['email', 'firstName', 'lastName', 'position'];

  selectedEmployee;

  dataSource;
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {  
    this.getEmployees();   
  }
  
  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
    this.employees = data;
    this.setDataSource();  
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<Employee>(this.employees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEmployee(employee: any) {
    const positionId = localStorage.getItem('positionId');
    if(positionId !== '1') {
      this.alertify.error('You do NOT have permission to see the profile');
    } else {
      this.selectedEmployee = employee;
    }
  }

  // deleteSupplier(supplier: Supplier) {
  //   const index: number = this.suppliers.indexOf(supplier);
  //   if (index !== -1) {
  //       this.suppliers.splice(index, 1);
  //       this.selectedSupplier = null;
  //   }    
  // }
}
