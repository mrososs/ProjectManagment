import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone:false ,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSidebarCollapsed = false;

  toggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
