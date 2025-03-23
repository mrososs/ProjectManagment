import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.passwordMatcher } // ✅ Pass as validators object
  );


  constructor(
    private _AuthService: AuthService,
    private _route: Router,
    private _toaster: ToastrService
  ) {}

  passwordMatcher(
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password !== confirmPassword ? { passwordMismatch: true } : null;
  }
  getControl(controlName: string): FormControl {
    return this.registerForm.get(controlName) as FormControl;
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const userData = {
      userName: this.registerForm.value.userName || '',
      country: this.registerForm.value.country || '',
      password: String(this.registerForm.value.password || ''),
      email: this.registerForm.value.email || '',
      phoneNumber: this.registerForm.value.phoneNumber || '',
      confirmPassword: this.registerForm.value.confirmPassword || '',
    };

    this._AuthService.register(userData).subscribe({
      next: () => {
        this._route.navigate(['/auth/verify']);
      },
      error: (err) => {
        this._toaster.error(err.error.message);
      },
      complete: () => {
        this._toaster.success('User Registered Successfully');
      },
    });

   
  }
}
