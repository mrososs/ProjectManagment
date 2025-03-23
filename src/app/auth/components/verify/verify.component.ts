import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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
    private _Router: Router
  ) { }


  getControl(controlName: string): FormControl {
    return this.verifyForm.get(controlName) as FormControl;
  }
}