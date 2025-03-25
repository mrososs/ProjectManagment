import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { passwordsMatchValidator } from '../../../shared/validators/password-matcher';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


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
    { validators: passwordsMatchValidator } // Apply custom validator to the whole form
  );

  constructor(private _AuthService: AuthService ,
    private _ToastrService:ToastrService ,
     private _Router:Router
  ){}

  getControl(controlName: string): FormControl {
    return this.resetPasswordForm.get(controlName) as FormControl;
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.valid) {

     this._AuthService.onResetPassword(this.resetPasswordForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this._ToastrService.success(res.message)
        this._Router.navigate(['auth/login'])
      },
      error: (err: any) =>{
        console.log(err);
        this._ToastrService.error(err.message)
       } ,
     });
    }
    else{
     console.log('Form is invalid!');
    }


  }
}
