import { EmployeeChangePasswordDialogComponent } from './../employee-change-password-dialog/employee-change-password-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../_models/employee.model';
import { EmployeeService } from '../../_services/employee.service';
import { Position } from './../../_models/position.model';
import { AlertifyService } from '../../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnChanges, OnInit {

  @Input() employee: Employee;
  @Output() employeeUpdatedEvent = new EventEmitter<Employee>();

  employeeForm: FormGroup;

  positions: Position[];
  selectedPosition: Position;
  isMyProfile:boolean = false;
  
  constructor(private dialog: MatDialog, private authService: AuthService, private alertify:AlertifyService ,private employeeService: EmployeeService) { }
  
  ngOnInit(): void {
    this.getPositions();
    this.checkIfItIsMyProfile();
  }

  ngOnChanges() {
    this.getEmployeeDetail(this.employee.employeeId);
  }

  getPositions() {
    this.authService.getPositions().subscribe((success: Position[]) => {
      this.positions = success;
    });
  }

  checkIfItIsMyProfile() {
    if(this.employee == null) {
      this.isMyProfile = true;
      this.getEmployeeDetail(+localStorage.getItem('employeeId'))
    } else {
      this.getEmployeeDetail(this.employee.employeeId);
    }
  }

    getEmployeeDetail(employeeId: number) {
    this.employeeService.getEmployee(employeeId).subscribe((data: Employee) => {
      this.employee = data;
      this.setSelectedPosition();
    });
  }

  setSelectedPosition() {
    if(this.positions != null) {
      this.positions.forEach(element => {
        if(element.positionId === this.employee.positionId) {
          this.selectedPosition = element;
        }
      })
    }
  }

  updateEmployee() {
    this.employee.positionId = this.selectedPosition.positionId;
    this.employee.positionName = this.selectedPosition.positionName;

    if(this.authService.isUpdateEmployeeDataAllowed()) {
      this.employeeService.updateEmployee(this.employee).subscribe(success => {
        this.alertify.success('updateSuccess');
        this.employeeUpdatedEvent.emit(this.employee);
      },
      error => {
        this.alertify.error('Error: ' + error.error);
        this.getEmployeeDetail(this.employee.employeeId);
      });
    } else {
      this.alertify.error(this.authService.NO_PERMISSION_ERROR_MESSAGE);
      this.getEmployeeDetail(this.employee.employeeId);
    }
  }
}
