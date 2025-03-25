import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITasks } from '../../core/interfaces/tasks';
import { IUsersChart } from '../../core/interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private taskCountSubject = new BehaviorSubject<ITasks>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });
  private userCountSubject = new BehaviorSubject<IUsersChart>({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  })
  userCount$ = this.userCountSubject.asObservable();
  taskCount$ = this.taskCountSubject.asObservable();
  constructor(private _http: HttpClient) {}
  fetchTaskCount():Observable<ITasks>{
    return this._http.get<ITasks>(`Task/count`).pipe(
      tap((taskCount)=>{
        this.taskCountSubject.next(taskCount);
      })
    )
  }
  fetchUserCount():Observable<IUsersChart>{
    return this._http.get<IUsersChart>(`Users/count`).pipe(
      tap((userCount)=>{
        this.userCountSubject.next(userCount);
      })
    )
  }
}
