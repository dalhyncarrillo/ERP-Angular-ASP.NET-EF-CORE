import { Employee } from './../../_models/employee.model';
import { EmployeeService } from './../../_services/employee.service';
import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-change-password-dialog',
  templateUrl: './employee-change-password-dialog.component.html',
  styleUrls: ['./employee-change-password-dialog.component.css']
})
export class EmployeeChangePasswordDialogComponent implements OnInit {

  form: FormGroup;
  employee: Employee;

  constructor(
    private alertifyService: AlertifyService,
    private router: Router,
    public authService: AuthService,
    private employeeService: EmployeeService) {}


  ngOnInit() {
    this.employeeService.getEmployee(+localStorage.getItem('employeeId')).subscribe((success: Employee) => {
      this.employee = success;
    });
    this.form = new FormGroup({
      currentPassword: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
 }
  onSubmitChangePassword() {
    this.authService.changePassword(this.employee.email, this.form.get('currentPassword').value, this.form.get('password').value).subscribe( success => {
      localStorage.clear();
      this.router.navigate(['/']);
    },
    error => {
      this.alertifyService.error('wrongCurrentPassword');
    })
  }

}
