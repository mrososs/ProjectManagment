import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { IUsersCount } from '../../interfaces/users-task';
import { IUsersData } from '../../interfaces/allUsers';
import { ITaskData } from '../../employee/interFaces/tasks';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  allUsers !: IUsersData []

  constructor (private _UsersService:UsersService){
    this.onGettingAllUsers()
  }

  onGettingAllUsers():void{
   const params ={ pageSize:10 , pageNumber : 1}
   this._UsersService.onGettingAllUsers(params).subscribe({
    next:(res)=>{
      this.allUsers= res.data
      console.log(this.allUsers);

     },
    error:(err)=>{
      console.log(err);

     },

   })
  }



}
