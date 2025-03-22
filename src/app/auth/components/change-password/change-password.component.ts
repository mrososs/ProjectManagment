import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomFormFieldComponent } from '../../../shared/components/custom-form-field/custom-form-field.component';

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

  constructor(private _AuthService: AuthService) {}

  getControl(controlName: string): FormControl {
    return this.changePasswordForm.get(controlName) as FormControl;
  }

  onchangePassword(form: any) {
    console.log(form);
    //  this._AuthService.onChangingPassword().subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //   },
    //   error:(err)=>{
    //     console.log(err);
    //   },
    //   complete :()=>{
    //   }
    // })
  }
}
