import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllUsers, IToggleData } from '../../../interfaces/allUsers';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}
  filterUsers(params: {
    pageSize: number;
    pageNumber: number;
    userName?: string;
    email?: string;
    country?: string;
  }): Observable<IAllUsers> {
    let url = `Users/?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`;
  
    if (params.userName) {
      url += `&userName=${encodeURIComponent(params.userName)}`;
    }
    if (params.email) {
      url += `&email=${encodeURIComponent(params.email)}`;
    }
    if (params.country) {
      url += `&country=${encodeURIComponent(params.country)}`;
    }
  
    return this._HttpClient.get<IAllUsers>(url);
  }
  

  onGettingAllUsers(params: {
    pageSize: number;
    pageNumber: number;
    title?: string;
  }): Observable<IAllUsers | any> {
    let url = `Users/Manager?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`;

    return this._HttpClient.get<IAllUsers>(url);
  }

  onToggleActivatedUsers(id: number): Observable<IToggleData | any> {
    return this._HttpClient.put(`Users/${id}`, { id });
  }

  getUserData(id: number): Observable<any> {
    return this._HttpClient.get(`Users/${id}`);
  }
}
