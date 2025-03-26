import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProAdd, IProject } from '../../../../core/interfaces/project-task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private _HttpClient:HttpClient
  ) { }

  onAddProject(data: IProAdd):Observable<IProAdd>{
    return this._HttpClient.post<IProAdd>('Project',data);
  }
  onEditProject(data: IProAdd, id:number):Observable<IProAdd>{
    return this._HttpClient.put<IProAdd>(`Project/${id}`,data);
  }


  onGitProjectId(id:number):Observable<any>{
    return this._HttpClient.get(`Project/${id}`);
  }
}
