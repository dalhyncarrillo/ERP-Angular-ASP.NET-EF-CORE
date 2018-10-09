import { DropdownDirective } from './_directives/dropdown.directive';
import { OrderItemsComponent } from './order/order-items/order-items.component';
import { OrderCreateDialogComponent } from './order/order-create-dialog/order-create-dialog.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ItemSuppliersCreateDialogComponent } from './items/item-suppliers-create-dialog/item-suppliers-create-dialog.component';
import { ItemCreateDialogComponent } from './items/item-create-dialog/item-create-dialog.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { AlertifyService } from './_services/alertify.service';
import { RegisterEmployeeComponent } from './employee/register-employee/register-employee.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './home/login/login.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemService } from './_services/item.service';
import { OrderService } from './_services/order.service';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { SupplierService } from './_services/supplier.service';
import { SupplierDetailComponent } from './suppliers/supplier-detail/supplier-detail.component';
import { SupplierCreateDialogComponent } from './suppliers/supplier-create-dialog/supplier-create-dialog.component';
import { ConfirmationDialogComponent } from './ConfirmationDialog/ConfirmationDialog.component';
import { TabsModule, TimepickerModule,BsDropdownModule   } from 'ngx-bootstrap';
import { AppMaterialModule } from './/app-material.module';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { OrderAddItemComponent } from './order/order-add-item/order-add-item.component';
import { AccountingComponent } from './accounting/accounting.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { EmployeeRoleComponent } from './employee/employee-role/employee-role.component';
import { EmployeeRoleAddDialogComponent } from './employee/employee-role-add-dialog/employee-role-add-dialog.component';
import { EmployeeChangePasswordDialogComponent } from './employee/employee-change-password-dialog/employee-change-password-dialog.component';
import { MomentModule } from 'ngx-moment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function getToken() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterEmployeeComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemCreateDialogComponent,
    ItemSuppliersCreateDialogComponent,
    SupplierListComponent,
    SupplierDetailComponent,
    SupplierCreateDialogComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderCreateDialogComponent,
    OrderItemsComponent,
    ConfirmationDialogComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    OrderAddItemComponent,
    AccountingComponent,
    DropdownDirective,
    EmployeeRoleComponent,
    EmployeeRoleAddDialogComponent,
    EmployeeChangePasswordDialogComponent
],
  imports: [
    FontAwesomeModule,
    MomentModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    TimepickerModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AppMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:5000', 'jordanrigo-001-site1.ftempurl.com']
      }
    }),
  ],
  providers: [
    AuthService,
    ItemService,
    SupplierService,
    AlertifyService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
