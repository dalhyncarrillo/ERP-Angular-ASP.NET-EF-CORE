import { EmployeeChangePasswordDialogComponent } from './employee/employee-change-password-dialog/employee-change-password-dialog.component';
import { EmployeeRoleAddDialogComponent } from './employee/employee-role-add-dialog/employee-role-add-dialog.component';
import { OrderCreateDialogComponent } from './order/order-create-dialog/order-create-dialog.component';
import { ItemSuppliersCreateDialogComponent } from './items/item-suppliers-create-dialog/item-suppliers-create-dialog.component';
import { ItemCreateDialogComponent } from './items/item-create-dialog/item-create-dialog.component';
import { ConfirmationDialogComponent } from './ConfirmationDialog/ConfirmationDialog.component';
import { SupplierCreateDialogComponent } from './suppliers/supplier-create-dialog/supplier-create-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import { MatStepperModule, MatIconModule, MatInputModule, MatDialogModule, MatDatepickerModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { OrderAddItemComponent } from './order/order-add-item/order-add-item.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatInputModule,  
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  exports: [
    CdkTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatInputModule,  
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  entryComponents: [
    SupplierCreateDialogComponent, 
    ConfirmationDialogComponent,
    ItemCreateDialogComponent, 
    ItemSuppliersCreateDialogComponent, 
    OrderCreateDialogComponent, 
    OrderAddItemComponent,
    EmployeeRoleAddDialogComponent,
    EmployeeChangePasswordDialogComponent
  ],
  declarations: []
})
export class AppMaterialModule { }
