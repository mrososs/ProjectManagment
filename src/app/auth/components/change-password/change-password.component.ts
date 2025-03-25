import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomFormFieldComponent } from '../../../shared/components/custom-form-field/custom-form-field.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', {}),
    newPassword: new FormControl('', {}),
    confirmNewPassword: new FormControl('', {}),
  });

  constructor(private _AuthService: AuthService ,
    private _ToastrService:ToastrService
  ) {}

  getControl(controlName: string): FormControl {
    return this.changePasswordForm.get(controlName) as FormControl;
  }

  onchangePassword(form: FormGroup) {
    if (this.changePasswordForm.valid) {
      console.log(form);
     this._AuthService.onChangingPassword(form.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success('Password has been Updated')
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(`Can't update Password`)
      },
      complete :()=>{
      }
    })
    }
    else{
      console.log('Form is invalid!');
     }


  }
}
