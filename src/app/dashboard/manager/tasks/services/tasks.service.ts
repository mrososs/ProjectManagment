import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITasks } from '../../../../core/interfaces/tasks';
import { ITaskAdd, Task } from '../../../../core/interfaces/taskModel';
import { IProject, IProjectsResponse } from '../../../../core/interfaces/project-task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksSubjcet = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubjcet.asObservable();
  private projectsSubject = new BehaviorSubject<IProject[]>([]);
  projects$ = this.projectsSubject.asObservable(); // Expose as Observable
  private usersSubject = new BehaviorSubject<any>([]);
  users$ = this.usersSubject.asObservable(); // Expose as Observable
  constructor(private _http: HttpClient) {}
  getTaskById(id: number): Observable<any> {
    return this._http.get(`Task/${id}`);
  }
  onAddTask(data: ITaskAdd): Observable<ITaskAdd> {
    return this._http.post<ITaskAdd>('Task', data);
  }
  getProjectsForManager(params: {
    pageSize: number;
    pageNumber: number;
    title?: string;
  }): void {
    let url = `Project/manager?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`;

    if (params.title) {
      url += `&title=${encodeURIComponent(params.title)}`;
    }

    this._http
      .get<IProjectsResponse>(url)
      .pipe(
        tap((response) => this.projectsSubject.next(response.data)) // Update BehaviorSubject
      )
      .subscribe();
  }
  getUsersForManager(params: {
    pageSize: number;
    pageNumber: number;
    title?: string;
  }): void {
    let url = `Users/manager?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`;

    if (params.title) {
      url += `&title=${encodeURIComponent(params.title)}`;
    }

    this._http
      .get<IProjectsResponse>(url)
      .pipe(
        tap((response) => this.usersSubject.next(response.data)) // Update BehaviorSubject
      )
      .subscribe();
  }
  getTasks(params: {
    pageSize: number;
    pageNumber: number;
    title?: string;
    status?: string;
  }) {
    let url = `Task/manager?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`;
    if (params.title) {
      url += `&title=${encodeURIComponent(params.title)}`;
    }
    if (params.status) {
      url += `&status=${encodeURIComponent(params.status)}`;
    }
    return this._http.get<{ data: Task[] }>(url).pipe(
      tap((res) => {
        this.tasksSubjcet.next(res.data);
      })
    );
  }
  deleteTask(id: number | undefined): Observable<any> {
      if (!id) {
        console.log('Category ID is required to delete.');
      }
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('Token not found');
      }
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this._http.delete(`Task/${id}` , { headers });
    }
}
