import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-change-password-dialog',
  templateUrl: './employee-change-password-dialog.component.html',
  styleUrls: ['./employee-change-password-dialog.component.css']
})
export class EmployeeChangePasswordDialogComponent implements OnInit {

  form: FormGroup;
  constructor(
    private alertifyService: AlertifyService,
    public dialogRef: MatDialogRef<EmployeeChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService) {}


  ngOnInit() {
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
    this.authService.changePassword(this.data.employee.email, this.form.get('currentPassword').value, this.form.get('password').value).subscribe( success => {
      this.dialogRef.close();
    },
    error => {
      this.alertifyService.error(error);
    })
  }

}
