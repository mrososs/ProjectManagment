import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { IUsersCount } from '../../interfaces/users-task';
import { IToggleData, IUsersData } from '../../interfaces/allUsers';
import { ITaskData } from '../../employee/interFaces/tasks';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  allUsers !: IUsersData []
  toggleUserData !: IToggleData ;
  isActive !: boolean ;
  toggleActive  : boolean = this.isActive
  length !:number
  pageSize !:number
  pageIndex !:number

  constructor (private _UsersService:UsersService){
    this.onGettingAllUsers()
  }

  onGettingAllUsers():void{
   const params ={ pageSize:10 , pageNumber : 1}
   this._UsersService.onGettingAllUsers(params).subscribe({
    next:(res)=>{
      this.allUsers= res.data

      this.length= res.totalNumberOfRecords
      this.pageIndex = res.totalNumberOfPages
     this.allUsers.forEach(el=>{
        this.isActive =  el.isActivated
        console.log(this.isActive);
      })


      console.log(this.allUsers);


     },
    error:(err)=>{
      console.log(err);
     },
   })
  }

  onToggleActivatedUsers(user :any):void{
     const id =user.id

    this._UsersService.onToggleActivatedUsers(id).subscribe({
      next:(res:any)=>{
        this.toggleUserData=res

        this.allUsers.forEach(el=>{
          if( el.id == user.id ){
            console.log('Done');
            this.isActive= !this.isActive
          }
        })


         console.log( this.toggleUserData);
        console.log( this.isActive);

       },
      error:(err:any)=>{
        console.log(err);
       }
    })

  }


  handlePageEvent(e: PageEvent) {
    // console.log(e);
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

}
