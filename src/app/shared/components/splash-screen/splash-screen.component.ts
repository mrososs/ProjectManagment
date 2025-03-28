import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  standalone:false ,
  styleUrl: './splash-screen.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1.5s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),

    trigger('moveUp', [
      transition('false => true', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '5s cubic-bezier(0.25, 1, 0.5, 1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class SplashScreenComponent implements OnInit {
  animationState = false;
  constructor(private _storageService: StorageService, private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = true;
    }, 10);
    setTimeout(() => {
      this.redirectUser();
    }, 7000); // Adjust time based on animation duration
  }
  private redirectUser() {
    if (this._storageService.isLoggedIn()) {
      const role = this._storageService.getUserRole(); // Get role from storage

      if (role === 'Employee') {
        this.router.navigate(['/dashboard']); // Redirect to Employee Dashboard
      } else if (role === 'Manager') {
        this.router.navigate(['/dashboard']); // Redirect to Manager Dashboard
      } else {
        this.router.navigate(['/auth']); // Fallback if role is unknown
      }
    } else {
      this.router.navigate(['/auth']); // Redirect to Auth if not logged in
    }
  }
}
