import { ItemSuppliersCreateDialogComponent } from './items/item-suppliers-create-dialog/item-suppliers-create-dialog.component';
import { ItemCreateDialogComponent } from './items/item-create-dialog/item-create-dialog.component';
import { ConfirmationDialogComponent } from './ConfirmationDialog/ConfirmationDialog.component';
import { SupplierCreateDialogComponent } from './suppliers/supplier-create-dialog/supplier-create-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatStepperModule, MatIconModule, MatInputModule, MatDialogModule, MatDatepickerModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatSortModule } from '@angular/material';

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
  ],
  exports: [
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

  ],
  //TODO MIERT VAN AZ KOMMENTELTBEN SupplierListComponent??? 2018.07.10
  //entryComponents: [SupplierCreateDialogComponent, ConfirmationDialogComponent, SupplierListComponent, ItemCreateDialogComponent, ItemSuppliersCreateDialogComponent],
  entryComponents: [SupplierCreateDialogComponent, ConfirmationDialogComponent, ItemCreateDialogComponent, ItemSuppliersCreateDialogComponent],
  declarations: []
})
export class AppMaterialModule { }
