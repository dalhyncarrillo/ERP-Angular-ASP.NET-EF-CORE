import { Employee } from './../../_models/employee.model';
import { AuthService } from './../../_services/auth.service';
import { Role } from './../../_models/role.model';
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnChanges {
  @Input() employee: Employee;

  changeOccured = false;
  employeeRoles: Role[];
  constructor(private authService: AuthService) { }

  ngOnChanges() {
    this.authService.getEmployeeRoles(this.employee.employeeId).subscribe((success: Role[]) => {
      this.employeeRoles = success;
    })
    console.log(this.employeeRoles);
  }
  onSaveChanges() {

  }

  onDeleteRole(role: Role) {

  }

  onAddRole() {

  }
}
