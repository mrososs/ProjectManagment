import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllUsers } from '../../../interfaces/allUsers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) {}

  onGettingAllUsers(params:any):Observable<any>{
    return this._HttpClient.get(`Users/Manager` , params)
  }
}
