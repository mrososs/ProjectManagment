import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  IProAdd,
  IProject,
  IProjectsResponse,
} from '../../../../core/interfaces/project-task';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<IProject[]>([]);
  projects$ = this.projectsSubject.asObservable(); // Expose as Observable
  constructor(private _HttpClient: HttpClient) {}

  onAddProject(data: IProAdd): Observable<IProAdd> {
    return this._HttpClient.post<IProAdd>('Project', data);
  }
  onEditProject(data: IProAdd, id: number): Observable<IProAdd> {
    return this._HttpClient.put<IProAdd>(`Project/${id}`, data);
  }

  onGitProjectId(id: number): Observable<any> {
    return this._HttpClient.get(`Project/${id}`);
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

    this._HttpClient
      .get<IProjectsResponse>(url)
      .pipe(
        tap((response) => this.projectsSubject.next(response.data)) // Update BehaviorSubject
      )
      .subscribe();
  }
}
