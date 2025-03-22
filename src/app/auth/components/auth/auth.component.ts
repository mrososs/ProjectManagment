import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm!: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(''), // Changed from emailControl to email
    });
  }
  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
}
