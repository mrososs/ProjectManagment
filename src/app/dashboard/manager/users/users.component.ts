import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { IUsersCount } from '../../interfaces/users-task';
import { IToggleData, IUsersData } from '../../interfaces/allUsers';
import { ITaskData } from '../../employee/interFaces/tasks';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  searchForm!: FormGroup;
  allUsers!: IUsersData[];

  constructor(private _UsersService: UsersService) {
    this.onGettingAllUsers();
  }
  filterByStatus(status: string) {
    const title = this.searchForm.get('search')?.value || '';
    this._UsersService
      .onGettingAllUsers({
        pageSize: 10,
        pageNumber: 0,
        title,
        status,
      })
      .subscribe();
  }

  onGettingAllUsers(): void {
    const params = { pageSize: 10, pageNumber: 1 };
    this._UsersService.onGettingAllUsers(params).subscribe({
      next: (res) => {
        this.allUsers = res.data;
        console.log(this.allUsers);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
