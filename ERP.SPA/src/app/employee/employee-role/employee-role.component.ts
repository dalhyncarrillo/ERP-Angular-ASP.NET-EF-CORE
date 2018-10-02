import { EmployeeRoleAddDialogComponent } from './../employee-role-add-dialog/employee-role-add-dialog.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ConfirmationDialogComponent } from './../../ConfirmationDialog/ConfirmationDialog.component';
import { Employee } from './../../_models/employee.model';
import { AuthService } from './../../_services/auth.service';
import { Role } from './../../_models/role.model';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../_services/language.service';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnChanges {
  @Input() employee: Employee;
  @Input() isMyProfile: boolean;

  changeOccured = false;
  employeeRoles: Role[];
  constructor(private language: LanguageService, private authService: AuthService, private dialog: MatDialog, private alertifyService: AlertifyService) { }

  ngOnChanges() {
   this.getEmployeeRoles();
  }

   getCurrentLang() {
    return this.language.currentLang;
  }
  getEmployeeRoles() {
    this.authService.getEmployeeRoles(this.employee.employeeId).subscribe((success: Role[]) => {
      this.employeeRoles = success;
    })
  }

  onDeleteRole(role: Role) {

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '250px',
      width: '500px',
      data: { message: 'Are you sure you want to delete?\n' + role.roleId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes') {
        this.authService.DeleteEmployeeRole(this.employee.employeeId, role.roleId).subscribe(success => {
          this.alertifyService.success('deleteSuccess');
          this.employeeRoles.splice(this.employeeRoles.findIndex(element => element.roleId === role.roleId), 1);
        },
        error => {
          this.alertifyService.error('Error: ' + error.error);
        });  
      }
    });
  }

  onAddRole() {
    let dialogRef = this.dialog.open(EmployeeRoleAddDialogComponent, {
      height: '800px',
      width: '1200px',
      data: {employeeId: this.employee.employeeId}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.alertifyService.success('createSuccess');
        this.employeeRoles.push(result);
      }
    });
  }
}
