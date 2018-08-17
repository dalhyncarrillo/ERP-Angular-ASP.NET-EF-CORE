import { OrderListComponent } from './order/order-list/order-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { ItemListComponent } from './items/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterEmployeeComponent } from './employee/register-employee/register-employee.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
<<<<<<< HEAD
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard]},
=======
const routes: Routes = [
  { path: 'home', component: HomeComponent},
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
  { path: 'register', component: RegisterEmployeeComponent, canActivate: [AuthGuard]},
  { path: 'items', component: ItemListComponent, canActivate: [AuthGuard]},
  { path: 'suppliers', component: SupplierListComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }