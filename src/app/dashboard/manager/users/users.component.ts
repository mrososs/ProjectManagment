import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { IUsersData } from '../../interfaces/allUsers';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  searchForm!: FormGroup;
  allUsers: IUsersData[] = [];
  filterField: string = 'userName'; // default filter field

  pageSize = 10;
  pageNumber = 1;
  length = 0;

  constructor(private _UsersService: UsersService, private fb: FormBuilder) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [''],
    });

    this.getUsers();
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((value: string) => {
        if (value.trim()) {
          this.searchUsers(value.trim());
        } else {
          this.getUsers(); // fallback to default list
        }
      });
  }

  getUsers(): void {
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };

    this._UsersService.onGettingAllUsers(params).subscribe({
      next: (res) => {
        this.allUsers = res.data;
        this.length = res.totalNumberOfRecords; // ✅ Use correct key from API
        console.log(this.allUsers);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setFilterField(field: string): void {
    this.filterField = field;
    this.pageNumber = 1;
    const searchTerm = this.searchForm.get('search')?.value;
    if (searchTerm) {
      this.searchUsers(searchTerm);
    } else {
      this.getUsers(); // fallback to full list
    }
  }

  searchUsers(searchValue: string): void {
    const params: any = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };

    // Only add the dynamic field if it's set
    if (this.filterField) {
      params[this.filterField] = searchValue;
    }

    this._UsersService.filterUsers(params).subscribe({
      next: (res) => {
        this.allUsers = res.data;
      },
      error: (err) => console.error(err),
    });
  }
  resetFilter(): void {
    this.filterField = 'userName'; // or null if you want to not filter
    this.searchForm.get('search')?.setValue('');
    this.getUsers();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1; // Angular paginator is 0-based
    this.getUsers();
  }
  toggleStatus(userId: number): void {
    this._UsersService.onToggleActivatedUsers(userId).subscribe({
      next: () => {
        // After toggling, refresh the user list to reflect the updated status
        this.getUsers();
      },
      error: (err) => {
        console.error('Error toggling user status:', err);
      },
    });
  }
}
