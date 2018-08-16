import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Employee } from '../_models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Employee[]>(environment.baseurl + 'employees');
  }

  getEmployee(employeeEmail: string) {
    return this.http.get<Employee>(environment.baseurl + 'employees/' + employeeEmail);
  }

  updateEmployee(employeeToUpdate: Employee) {
    return this.http.put(environment.baseurl + 'employees', employeeToUpdate);
  }
}
