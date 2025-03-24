import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
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
  constructor(private _authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = true;
    }, 10);
    setTimeout(() => {
      this.redirectUser();
    }, 7000); // Adjust time based on animation duration
  }
  private redirectUser() {
    if (this._authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // Redirect to Dashboard if logged in
    } else {
      this.router.navigate(['/auth']); // Redirect to Auth if not logged in
    }
  }
}
