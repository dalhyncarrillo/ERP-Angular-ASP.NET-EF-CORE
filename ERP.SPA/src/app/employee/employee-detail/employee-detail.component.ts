import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Employee } from '../../_models/employee.model';
import { EmployeeService } from '../../_services/employee.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnChanges {

  @Input() employee: Employee;
  constructor(private alertify:AlertifyService ,private employeeService: EmployeeService) { }

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
      console.log(this.employee);
    });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employee).subscribe(success => {
      this.alertify.success('Employee updated successfully!');
    },
    error => {
      this.alertify.error('Error: ' + error.error);
      this.getEmployeeDetail();
    });
  }

}
