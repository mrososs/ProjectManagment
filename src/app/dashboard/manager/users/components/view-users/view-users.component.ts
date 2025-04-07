import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../projects/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-view-users',
  standalone: false,
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss'
})
export class ViewUsersComponent implements OnInit {
  userForm: FormGroup;
  imagePath: string = '';
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private _UsersService: UsersService,
    private _toaster: ToastrService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      userName: [''],
      email: [''],
      phoneNumber: [''],
      creationDate: [''],
      country: [''],
      isActivated: [false]
    });
  }

  ngOnInit(): void {
    // 👇 جلب الـ ID من الـ route
    this.userId = +this._activatedRoute.snapshot.paramMap.get('id')!;
    
    this._UsersService.getUserData(this.userId).subscribe({
      next: (data) => {
        this.userForm.patchValue({
          userName: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          creationDate: data.task?.[1]?.creationDate
          ? new Date(data.task[1].creationDate).toLocaleDateString()
          : '',
          country: data.country,
          isActivated: data.isActivated
        });
        this.imagePath = data.imagePath;
      },
      error: (err) => {
        this._toaster.error('Error loading user data');
        console.error(err);
      }
    });
  }
}