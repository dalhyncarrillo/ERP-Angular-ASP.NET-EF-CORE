import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterEmployeeComponent } from './employee/register-employee/register-employee.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterEmployeeComponent}
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }