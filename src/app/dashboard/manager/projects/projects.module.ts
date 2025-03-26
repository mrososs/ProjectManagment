import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ProjectsComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
