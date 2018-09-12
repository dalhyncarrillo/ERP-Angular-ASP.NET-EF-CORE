import { EmployeeChangePasswordDialogComponent } from './employee/employee-change-password-dialog/employee-change-password-dialog.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { AccountingComponent } from './accounting/accounting.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { ItemListComponent } from './items/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterEmployeeComponent } from './employee/register-employee/register-employee.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { PasswordGuard } from './_guards/password.guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'accounting', component: AccountingComponent},
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard,PasswordGuard]},
  { path: 'employees/profile', component: EmployeeDetailComponent, canActivate: [AuthGuard,PasswordGuard]},
  { path: 'employees/changepassword', component: EmployeeChangePasswordDialogComponent, canActivate: [AuthGuard,PasswordGuard]},
  { path: 'register', component: RegisterEmployeeComponent, canActivate: [AuthGuard,PasswordGuard]},
  { path: 'items', component: ItemListComponent, canActivate: [AuthGuard,PasswordGuard]},
  { path: 'suppliers', component: SupplierListComponent, canActivate: [AuthGuard,PasswordGuard]},
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard,PasswordGuard]},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }