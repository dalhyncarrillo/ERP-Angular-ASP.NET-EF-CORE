import { ItemListComponent } from './items/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterEmployeeComponent } from './employee/register-employee/register-employee.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterEmployeeComponent},
  { path: 'items', component: ItemListComponent},
  { path: 'suppliers', component: SupplierListComponent}
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }