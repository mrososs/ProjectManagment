import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordsMatchValidator } from '../../../shared/validators/password-matcher';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  selectedFile: File | null = null;
  imagePreview: string | null = null;

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
    { validators: passwordsMatchValidator } // ✅ Pass as validators object
  );

  constructor(
    private _AuthService: AuthService,
    private _route: Router,
    private _toaster: ToastrService,
    private _HttpClient: HttpClient
  ) { }


  getControl(controlName: string): FormControl {
    return this.registerForm.get(controlName) as FormControl;
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

 
    const userData = new FormData();
    userData.append('userName', this.registerForm.value.userName || '');
    userData.append('country', this.registerForm.value.country || '');
    userData.append('password', String(this.registerForm.value.password || ''));
    userData.append('email', this.registerForm.value.email || '');
    userData.append('phoneNumber', this.registerForm.value.phoneNumber || '');
    userData.append('confirmPassword', this.registerForm.value.confirmPassword || '');

    if (this.selectedFile) {
      userData.append('imagePath', this.selectedFile);
    }

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
  dropped(files: NgxFileDropEntry[]) {
    if (files.length > 0) {
      const droppedFile = files[0];
  
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.selectedFile = file;
          // console.log('Selected File:', file);
  
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePreview = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }
  
  deleteImage() {
    this.imagePreview = null;
    this.selectedFile = null;
  }
  
  uploadImage() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile);
  
    this._HttpClient.post('/Users/Register', formData).subscribe(response => {
      console.log('Image uploaded successfully', response);
    });
  }
}
