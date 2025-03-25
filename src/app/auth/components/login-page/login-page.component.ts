import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  constructor(
    private _AuthService: AuthService,
    private _toaster: ToastrService,
    private _router: Router,
    private _storageService: StorageService
  ) {
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
      next: (res: any) => {
        this._toaster.success('Login Successful');
        localStorage.setItem('token', res.token);
      },
      complete: () => {
        this._storageService.loadUserRole();
        setTimeout(()=>{
          const role = this._storgeService.getUserRole(); // Get role from storage
          if (role === 'Employee') {
            this._router.navigate(['/dashboard/employee']); // Redirect to Employee Dashboard
          } else if (role === 'Manager') {
            this._router.navigate(['/dashboard/manager']); // Redirect to Manager Dashboard
          } else {
            this._router.navigate(['/auth']); // Fallback if role is unknown
          }
        },2000)
      },
    });
  }
}
