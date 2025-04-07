import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllUsers, IToggleData } from '../../../interfaces/allUsers';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}

  onGettingAllUsers(params: {
    pageSize: number;
    pageNumber: number;
    title?: string;
  }): Observable<IAllUsers | any> {
    let url = `Users/Manager?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`;
    if (params.title) {
      url += `&title=${encodeURIComponent(params.title)}`;
    }
    return this._HttpClient.get<IAllUsers>(url);
  }

  onToggleActivatedUsers(id: number): Observable<IToggleData | any> {
    return this._HttpClient.put(`Users/${id}`, { id });
  }

  getUserData(id: number): Observable<any> {
    return this._HttpClient.get(`Users/${id}`);
  }
}
