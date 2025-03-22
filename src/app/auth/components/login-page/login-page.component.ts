import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  constructor(private _AuthService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  getControl(controlName: string): FormControl {
    return this.loginForm.get(controlName) as FormControl;
  }
  login() {
    this._AuthService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
