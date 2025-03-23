import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  standalone:false ,
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  constructor(private _AuthService: AuthService,

    // private _toaster:ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      basicfile: new FormControl(null, Validators.required),
    });
  }
  // public GetFileOnLoad(event: any) {
  //   var file = event.target.files[0];
  //   var element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
  //   if(element != null) {
  //     element.value = file?.name;
  //   }
  // }
  // getControl(controlName: string): FormControl {
  //   return this.loginForm.get(controlName) as FormControl;
  // }

  // login() {
  //   this._AuthService.login(this.loginForm.value).subscribe({
  //     next: (res) => {
  //       this._toaster.success('Hello world!', 'Toastr fun!');
  //     },
  //   });
  // }

}
