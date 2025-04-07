import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask, ITaskData } from '../../interFaces/tasks';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _HttpClient: HttpClient) {}

  onGettingAllEmployeeTasks(params:any):Observable<ITaskData | any>{
    return this._HttpClient.get<ITaskData>(`Task` , params)
  }

  updateItemStatus(id:null | number , status:string):Observable<any>{
    return this._HttpClient.put(`Task/${id}/change-status` ,{ status: status})
  }

}
