import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';


@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatIconModule
  ]
})
export class ManagerModule { }
