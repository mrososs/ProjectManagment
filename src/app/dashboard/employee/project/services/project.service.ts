import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../../interFaces/tasks';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private _HttpClient: HttpClient) {}

  onGettingAllEmployeeProjects(params:any):Observable<any>{
    return this._HttpClient.get(`Project/employee` , params)
  }
}
