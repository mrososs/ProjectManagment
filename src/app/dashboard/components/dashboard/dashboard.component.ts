import { Component, OnInit } from '@angular/core';
import { StorgeService } from '../../../core/services/storge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private _storgeService: StorgeService, private _router: Router) {}

  ngOnInit(): void {
    if (this._storgeService.isEmployee()) {
      this._router.navigate(['/dashboard/manager']);
    } else if (this._storgeService.isManager()) {
      this._router.navigate(['/dashboard/manager']);
    }
  }
}
