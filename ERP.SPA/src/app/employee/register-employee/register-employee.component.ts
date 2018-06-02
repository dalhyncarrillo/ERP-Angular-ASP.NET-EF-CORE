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
export class RegisterEmployeeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  employeeToRegister:any ={};
  position:string;
  positions: Position[];
  ngOnInit() {
    this.getPositions();
  }

  getPositions() {
    this.authService.getPositions().subscribe((data: Position[])  => {
      this.positions = data;
    });
  }

  submit() {
    this.positions.forEach(element => {
      if(element.positionName === this.position) {
        this.employeeToRegister.positionId = element.positionId;
      }
    });
    this.authService.register(this.employeeToRegister).subscribe();
  }
}
