import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required),
  }, this.passwordMatcher); 

  constructor(
    private _AuthService: AuthService,
  ) {}

  passwordMatcher(formGroup: AbstractControl): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password !== confirmPassword ? { 'passwordMismatch': true } : null;
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
      confirmPassword: this.registerForm.value.confirmPassword || ''
    };

    this._AuthService.register(userData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log("Error Response:", err);
      }
    });

    console.log(this.registerForm.value);
  }
}

