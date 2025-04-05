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

  todo :string[] = ['Get to work', 'Pick up groceries' ];
  inProgress :string[] = ['Go home', 'Fall asleep']
  done :string[] = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail'];

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

         this.todo = this.toDoData.map(item => item.title)
         this.done = this.doneData.map(item => item.title)
         this.inProgress = this.inProgressData.map(item => item.title)

      } ,
      error:(err)=>{
        console.log(err);

      } ,
    })

  }


  drop(event: CdkDragDrop<string[]>) {
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
