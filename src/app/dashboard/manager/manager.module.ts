import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from '../components/manager/manager.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewUsersComponent } from './users/components/view-users/view-users.component';


@NgModule({
  declarations: [
    ManagerComponent,
    ViewUsersComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule
  ]
})
export class ManagerModule { }
