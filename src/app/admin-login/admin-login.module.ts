import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminLoginRoutingModule,
    DataTablesModule
  ]
})
export class AdminLoginModule { }
