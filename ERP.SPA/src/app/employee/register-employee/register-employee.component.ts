import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { Position } from '../../_models/position.model';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  positions: Position[];
  ngOnInit() {
    this.getPositions();
  }

  getPositions() {
    this.authService.getPositions().subscribe((data: Position[]) => {
      this.positions = data;
    });
  }

}
