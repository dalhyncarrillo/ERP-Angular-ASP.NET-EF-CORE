import { LanguageService } from './../../_services/language.service';
import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from 'src/app/_models/role.model';

@Component({
  selector: 'app-employee-role-add-dialog',
  templateUrl: './employee-role-add-dialog.component.html',
  styleUrls: ['./employee-role-add-dialog.component.css']
})
export class EmployeeRoleAddDialogComponent implements OnInit {

  roles: Role[];
  selectedRole: Role;
  constructor(private alertifyService: AlertifyService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<EmployeeRoleAddDialogComponent>,
    public languageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.authService.GetRolesThatEmployeeNotHave(this.data.employeeId).subscribe((success: Role[]) => {
      this.roles = success;
    })
    
  }

  onRoleSelected(role) {
    this.selectedRole = role;
  }

  createEmployeeRole() {
    this.authService.createEmployeeRole(this.data.employeeId, this.selectedRole.roleId).subscribe(success => {
      this.alertifyService.success('Role successfully added to employee');
      this.dialogRef.close(this.selectedRole);
    });
  }


}
