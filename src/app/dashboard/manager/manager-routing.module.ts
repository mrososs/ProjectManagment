import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { AddEditComponent } from './projects/components/add-edit/add-edit.component';

const routes: Routes = [
  { path: '', component: ManagerComponent },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
