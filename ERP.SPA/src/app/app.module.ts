import { RegisterEmployeeComponent } from './employee/register-employee/register-employee.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './home/login/login.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { InventoryService } from './_services/inventory.service';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { SupplierService } from './_services/supplier.service';
import { SupplierDetailComponent } from './suppliers/supplier-detail/supplier-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterEmployeeComponent,
    ItemListComponent,
    SupplierListComponent,
    SupplierDetailComponent,
    
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AuthService,
    InventoryService,
    SupplierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
