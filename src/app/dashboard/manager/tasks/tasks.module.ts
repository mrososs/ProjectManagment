import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    TasksComponent ,
      AddEditTaskComponent ,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule ,
    SharedModule,
    MatSelectModule
  ],

})
export class TasksModule { }
