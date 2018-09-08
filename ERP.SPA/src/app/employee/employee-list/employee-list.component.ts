import { AuthService } from './../../_services/auth.service';
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
  
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router, private employeeService: EmployeeService, private dialog: MatDialog) {}

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
    if(this.authService.isReadEmployeeDataAllowed()) {
      this.selectedEmployee = employee;
    } else {
      this.alertify.error(this.authService.NO_PERMISSION_ERROR_MESSAGE);
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
