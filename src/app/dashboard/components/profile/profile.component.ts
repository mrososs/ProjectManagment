import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { passwordsMatchValidator } from '../../../shared/validators/password-matcher';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
 selectedFile: File | null = null;
  imagePreview: string | null = null;
  firstLetter: string = 'V';
  restOfName: string = 'iew Profile';
  userId! : string | null;
  buttonText: string = 'Save';
  isEditMode:boolean = false;
  isViewMode!:string | null ;

  defaultImage = '../../../../assets/img/user.png';



  updateForm = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
  );

  constructor(
    private _AuthService: AuthService,
    private _route: Router,
    private _toaster: ToastrService,
    private _HttpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private _HelperService: HelperService
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isViewMode = (this.activatedRoute.snapshot.paramMap.get('formDisabled'))
    // console.log('Extracted User ID:', this.userId);
  }

  ngOnInit(): void {
    if (this.userId){
      this.isEditMode = true;
      this.getUser();
      this.firstLetter = 'E';
      this.restOfName = 'dit Profile';
    }
    if (this.isViewMode){
      this.updateForm.disable();
      setTimeout(() => this.updateForm.disable(), 0);
      this.firstLetter = 'V';
      this.restOfName = 'iew Profile';
    }
   }
   getUser(): void {
    this._HelperService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        
        this.updateForm.patchValue({
          userName: res.userName,
          country: res.country,
          email: res.email,
          phoneNumber: res.phoneNumber
        });
  
        const baseURL = "https://upskilling-egypt.com:3003/";
        this.imagePreview = res.imagePath ? `${baseURL}${res.imagePath}` : this.defaultImage;
        this._HelperService.updateProfileImage(this.imagePreview);
        this._HelperService.updateUserName(res.userName);
  
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  getControl(controlName: string): FormControl {
    return this.updateForm.get(controlName) as FormControl;
  }
  onSubmit() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

 
    const userData = new FormData();
    userData.append('userName', this.updateForm.value.userName || '');
    userData.append('country', this.updateForm.value.country || '');
    userData.append('email', this.updateForm.value.email || '');
    userData.append('phoneNumber', this.updateForm.value.phoneNumber || '');
    userData.append('confirmPassword', this.updateForm.value.confirmPassword || '');

    if (this.selectedFile) {
      userData.append('imagePath', this.selectedFile);
    }

    this._HelperService.updateUser(userData).subscribe({
      next: () => {
        this._route.navigate(['/dashboard']);
      },
      error: (err) => {
        this._toaster.error(err.error.message);
      },
      complete: () => {
        this._toaster.success('Updated Successfully');
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
