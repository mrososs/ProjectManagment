import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AddEditProjectComponent } from './components/add-edit-project/add-edit-project.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'add', component: AddEditProjectComponent },
  {path:'view/:id',component:AddEditProjectComponent},
  { path: 'edit/:id', component: AddEditProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
