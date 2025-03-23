import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',

  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  forgetPasswordForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toaster: ToastrService
  ) {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  getControl(controlName: string): FormControl {
    return this.forgetPasswordForm.get(controlName) as FormControl;
  }
  forgetPassword() {
    if (this.forgetPasswordForm.valid) {
      this._authService
        .forgetPassword(this.forgetPasswordForm.value.email)
        .subscribe(() => {
          this._toaster.success('Check your email to reset your password');
          this._router.navigate(['/auth/reset']);
        });
    }
  }
}
