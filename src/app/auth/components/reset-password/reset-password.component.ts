import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset-password',
  standalone: false,
  // imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  resetPasswordForm =new FormGroup({
    email:new FormControl('' , {}) ,
    password: new FormControl('' , {}) ,
    confirmPassword: new FormControl('' , {}),
    seed: new FormControl('' , {})

   })

  constructor(private _AuthService:AuthService){}

  onResetPassword(form:any):void{
    console.log(form);
    this._AuthService.onResetPassword(form.value).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      },
      complete :()=>{
      }
    })

  }

}
