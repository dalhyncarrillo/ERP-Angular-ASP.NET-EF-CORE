import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Position } from './../../_models/position.model';
import { Employee } from './../../_models/employee.model';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

//TODO
export class RegisterEmployeeComponent implements OnInit {
  
  employeeToRegister:any ={};
  position:string;
  positions: Position[];

  registerForm: FormGroup;


  constructor(private authService: AuthService) { }
  
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
      emailAddress: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
     return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  salaryNumberValidator() {

  var numbers = new RegExp(/^[0-9]+$/);
  var code = this.registerForm.get('salary').value;
  
  if(numbers.test(code))
  {
      console.log('code is numbers');
  }
  else
  {
      console.log("enter numbers only");
  }
  }

  onSubmit() {
    this.authService.register(this.employeeToRegister).subscribe();
  }
}
