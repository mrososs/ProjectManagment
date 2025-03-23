import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-verify',
  standalone: false,
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {

  verifyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('',[Validators.required] )
  });

  constructor(
    private _AuthService: AuthService,
    private _Toastr : ToastrService,
    private _Router: Router
  ) { }

  getControl(controlName: string): FormControl {
    return this.verifyForm.get(controlName) as FormControl;
  }

  sendData(data: FormGroup) {
    this._AuthService.verify(data.value).subscribe({
      next: () => {
        this._Toastr.success('Account Verified Successfully');
        this._Router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.log(err.error);
        this._Toastr.error(err.error.message);
      }
    });
   
  }
}