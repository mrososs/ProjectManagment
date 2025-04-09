import { Component } from '@angular/core';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Data } from '@angular/router';
import { IParams, ITask, ITaskData } from '../../../interFaces/tasks';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {



  allTasks !: ITaskData[]
  toDoData !: ITaskData[]
  doneData !: ITaskData[]
  inProgressData !: ITaskData[]

  params:IParams={ pageNumber:1 , pageSize:10 }

  constructor(private _TaskService:TaskService){

    this.onGettingAllEmployeeTasks()

  }

  onGettingAllEmployeeTasks():void{
    const params = { pageNumber:1 , pageSize:10 }
    this._TaskService.onGettingAllEmployeeTasks(params).subscribe({
      next:(res)=>{
        this.allTasks=res.data

        this.toDoData = this.allTasks.filter( arr => arr.status == 'ToDo')
        this.doneData= this.allTasks.filter( arr => arr.status == 'Done')
        this.inProgressData = this.allTasks.filter( arr => arr.status == 'InProgress')
      } ,
      error:(err)=>{
        console.log(err);

      } ,
    })

  }


  drop(event: CdkDragDrop<ITaskData[]> ) {
    // console.log(event);
    const currentItemID = event.item.data; // item id By --> [cdkDragData]="item.id"
    const newStatus = event.container.id; // Update the item's status--> The ID of the container indicates the new status
    this._TaskService.updateItemStatus(currentItemID, newStatus ).subscribe({
      next :(res) =>{
        // console.log(res);
      } ,
      error :(err) =>{
         console.error('Error updating item status:', err);
      } ,

    })

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
