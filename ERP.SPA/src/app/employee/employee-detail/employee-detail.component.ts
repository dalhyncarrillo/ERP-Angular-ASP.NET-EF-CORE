import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Employee } from '../../_models/employee.model';
import { EmployeeService } from '../../_services/employee.service';
import { AlertifyService } from '../../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnChanges {

  employeeForm: FormGroup;
  @Input() employee: Employee;
  
  constructor(private authService: AuthService, private alertify:AlertifyService ,private employeeService: EmployeeService) { }


  ngOnChanges() {
    this.getEmployeeDetail();
  }
  

  getEmployeeDetail() {
    this.employeeService.getEmployee(this.employee.email).subscribe(data => {
      this.employee.firstName = data.firstName;
      this.employee.lastName = data.lastName;
      this.employee.dateOfBirth = data.dateOfBirth;
      this.employee.positionId = data.positionId;
      this.employee.salary = data.salary;
      this.employee.timestamp = data.timestamp;
    });
  }

  updateEmployee() {
    if(this.authService.isUpdateEmployeeDataAllowed()) {
      this.employeeService.updateEmployee(this.employee).subscribe(success => {
        this.alertify.success('Employee updated successfully!');
      },
      error => {
        this.alertify.error('Error: ' + error.error);
        this.getEmployeeDetail();
      });
    } else {
      this.alertify.error(this.authService.NO_PERMISSION_ERROR_MESSAGE);
      this.getEmployeeDetail();
    }
  
  }

}
