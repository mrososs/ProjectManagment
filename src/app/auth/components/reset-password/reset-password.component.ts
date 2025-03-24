import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: false,
})
export class ResetPasswordComponent {
  resetPasswordForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      seed: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordsMatchValidator } // Apply custom validator to the whole form
  );

  constructor(private _AuthService: AuthService) {}

  getControl(controlName: string): FormControl {
    return this.resetPasswordForm.get(controlName) as FormControl;
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    this._AuthService.onResetPassword(this.resetPasswordForm.value).subscribe({
      next: (res: any) => console.log(res),
      error: (err: any) => console.log(err),
    });
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (!password || !confirmPassword) return null; // Safety check

    if (
      confirmPassword.errors &&
      !confirmPassword.errors['passwordsMismatch']
    ) {
      return null; // Skip if other validation errors exist
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true }); // Set error
    } else {
      confirmPassword.setErrors(null); // Remove error if fixed
    }

    return null;
  }
}
