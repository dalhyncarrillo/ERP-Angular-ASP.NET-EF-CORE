import { EmployeeChangePasswordDialogComponent } from './../employee-change-password-dialog/employee-change-password-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Employee } from '../../_models/employee.model';
import { EmployeeService } from '../../_services/employee.service';
import { Position } from './../../_models/position.model';
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
  positions: Position[];
  isMyProfile:boolean = false;
  
  constructor(private dialog: MatDialog, private authService: AuthService, private alertify:AlertifyService ,private employeeService: EmployeeService) { }
  
  ngOnInit(): void {
    this.checkIfItIsMyProfile();
  }

  ngOnChanges() {
    this.checkIfItIsMyProfile();
    this.getPositions();
  }

  checkIfItIsMyProfile() {
    if(this.employee == null) {
      this.isMyProfile = true;
      this.getEmployeeDetail(+localStorage.getItem('employeeId'))
    } else {
      this.getEmployeeDetail(this.employee.employeeId);
    }
  }

  getPositions() {
    this.authService.getPositions().subscribe((success: Position[]) => {
      this.positions = success;
    });
  }
  

  getEmployeeDetail(employeeId: number) {
    this.employeeService.getEmployee(employeeId).subscribe(data => {
     this.employee = data;
    });
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

  // onChangePassword() {
  //   let dialotRef = this.dialog.open(EmployeeChangePasswordDialogComponent,{
  //     height: '350px',
  //     width: '400px',
  //     data: { employee: this.employee}
  //   });
  // }

}
