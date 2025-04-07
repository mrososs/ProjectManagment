import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { IUsersData } from '../../interfaces/allUsers';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  searchForm!: FormGroup;
  allUsers: IUsersData[] = [];

  pageSize = 10;
  pageNumber = 1;
  length = 0;

  constructor(private _UsersService: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [''],
    });

    this.getUsers();
  }

  getUsers(status: string = ''): void {
    const title = this.searchForm.get('search')?.value || '';
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      title,
      status,
    };
  
    this._UsersService.onGettingAllUsers(params).subscribe({
      next: (res) => {
        this.allUsers = res.data;
        this.length = res.totalNumberOfRecords; // ✅ Use correct key from API
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  

  filterByStatus(status: string): void {
    this.pageNumber = 1; // Reset to first page on filter
    this.getUsers(status);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1; // Angular paginator is 0-based
    this.getUsers();
  }
}
