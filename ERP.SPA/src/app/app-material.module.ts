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
<<<<<<< HEAD
import { OrderAddItemComponent } from './order/order-add-item/order-add-item.component';
=======
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790

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
  //TODO MIERT VAN AZ KOMMENTELTBEN SupplierListComponent??? 2018.07.10
  //entryComponents: [SupplierCreateDialogComponent, ConfirmationDialogComponent, SupplierListComponent, ItemCreateDialogComponent, ItemSuppliersCreateDialogComponent],
<<<<<<< HEAD
  entryComponents: [SupplierCreateDialogComponent, ConfirmationDialogComponent, ItemCreateDialogComponent, ItemSuppliersCreateDialogComponent, OrderCreateDialogComponent, OrderAddItemComponent],
=======
  entryComponents: [SupplierCreateDialogComponent, ConfirmationDialogComponent, ItemCreateDialogComponent, ItemSuppliersCreateDialogComponent, OrderCreateDialogComponent],
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
  declarations: []
})
export class AppMaterialModule { }
