import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false;
  constructor(private _storgeService: StorageService, private _router: Router) {}

  ngOnInit(): void {}
  toggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
