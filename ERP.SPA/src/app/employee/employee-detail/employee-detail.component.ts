import { EmployeeChangePasswordDialogComponent } from './../employee-change-password-dialog/employee-change-password-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Employee } from '../../_models/employee.model';
import { EmployeeService } from '../../_services/employee.service';
import { AlertifyService } from '../../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnChanges, OnInit {


  employeeForm: FormGroup;
  @Input() employee: Employee;
  isMyProfile:boolean = false;
  
  constructor(private dialog: MatDialog, private authService: AuthService, private alertify:AlertifyService ,private employeeService: EmployeeService) { }
  
  ngOnInit(): void {
    this.checkIfItIsMyProfile();
  }

  ngOnChanges() {
    this.checkIfItIsMyProfile();
  }

  checkIfItIsMyProfile() {
    if(this.employee == null) {
      this.isMyProfile = true;
      this.getEmployeeDetail(+localStorage.getItem('employeeId'))
    } else {
      this.getEmployeeDetail(this.employee.employeeId);
    }
  }
  

  getEmployeeDetail(employeeId: number) {
    this.employeeService.getEmployee(employeeId).subscribe(data => {
      console.log(data);
     this.employee = data;
    });
    console.log(this.employee);
  }

  updateEmployee() {
    if(this.authService.isUpdateEmployeeDataAllowed()) {
      this.employeeService.updateEmployee(this.employee).subscribe(success => {
        this.alertify.success('Employee updated successfully!');
      },
      error => {
        this.alertify.error('Error: ' + error.error);
        this.getEmployeeDetail(this.employee.employeeId);
      });
    } else {
      this.alertify.error(this.authService.NO_PERMISSION_ERROR_MESSAGE);
      this.getEmployeeDetail(this.employee.employeeId);
    }
  }

  onChangePassword() {
    let dialotRef = this.dialog.open(EmployeeChangePasswordDialogComponent,{
      height: '350px',
      width: '400px',
      data: { employee: this.employee}
    });
  }

}
