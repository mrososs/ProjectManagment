import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'task', loadChildren: () => import('./tasks/task.module').then(m => m.TasksModule) },
  { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
