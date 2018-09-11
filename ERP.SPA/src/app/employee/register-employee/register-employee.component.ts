import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Position } from './../../_models/position.model';
import { Employee } from './../../_models/employee.model';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

//TODO
export class RegisterEmployeeComponent implements OnInit {
  
  employeeToRegister: Employee;
  position:string;
  positions: Position[];

  registerForm: FormGroup;


  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router ) { }
  
  ngOnInit() {
    this.getPositions();
    this.createRegisterForm();

  }
  getPositions() {
    this.authService.getPositions().subscribe((data: Position[])  => {
      this.positions = data;
    });
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
    });
  }

  salaryNumberValidator() {

  var numbers = new RegExp(/^[0-9]+$/);
  var code = this.registerForm.get('salary').value;
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.employeeToRegister = Object.assign({}, this.registerForm.value);
      this.employeeToRegister.positionId = this.registerForm.get('position').value.positionId;
      this.authService.register(this.employeeToRegister).subscribe( success => {
        
        this.alertify.success('Employee successfully registered!')
        this.router.navigate(['employees']);
      },
      error => {
        this.alertify.error('Error: ' + error.error);
      });
    }

  }
}
