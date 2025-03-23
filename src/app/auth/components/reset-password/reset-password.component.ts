import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone:false ,
})
export class ResetPasswordComponent {
  resetPasswordForm = new FormGroup({
    email: new FormControl('', {}),
    password: new FormControl('', {}),
    confirmPassword: new FormControl('', {}),
    seed: new FormControl('', {}),
  });

  constructor(private _AuthService: AuthService) {}

  getControl(controlName: string): FormControl {
    return this.resetPasswordForm.get(controlName) as FormControl;
  }


  onResetPassword(form: any): void {
    console.log(form);
    this._AuthService.onResetPassword(form.value).subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (err:any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
