import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Position } from './../../_models/position.model';
import { Employee } from './../../_models/employee.model';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { post } from 'selenium-webdriver/http';
<<<<<<< HEAD
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '../../../../node_modules/@angular/router';
=======
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

//TODO
export class RegisterEmployeeComponent implements OnInit {
  
<<<<<<< HEAD
  employeeToRegister: Employee;
=======
  employeeToRegister:any ={};
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
  position:string;
  positions: Position[];

  registerForm: FormGroup;


<<<<<<< HEAD
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router ) { }
=======
  constructor(private authService: AuthService) { }
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
  
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
<<<<<<< HEAD
      email: new FormControl('',[Validators.required, Validators.email]),
=======
      emailAddress: new FormControl('',[Validators.required, Validators.email]),
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
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
<<<<<<< HEAD
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

=======
    this.authService.register(this.employeeToRegister).subscribe();
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
  }
}
