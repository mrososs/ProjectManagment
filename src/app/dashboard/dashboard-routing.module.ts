import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { managerGuard } from '../core/guards/manager.guard';
import { employeeGuard } from '../core/guards/employee.guard';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomepageComponent },
      {
        path: 'manager',
        loadChildren: () =>
          import('./manager/manager.module').then((m) => m.ManagerModule),
        canActivate: [managerGuard],
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
        canActivate: [employeeGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
