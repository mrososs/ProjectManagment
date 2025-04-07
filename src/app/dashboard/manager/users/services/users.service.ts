import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllUsers, IToggleData } from '../../../interfaces/allUsers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) {}


  onGettingAllUsers(params:any):Observable<IAllUsers | any>{
    return this._HttpClient.get<IAllUsers>(`Users/Manager` , params)
  }

  onToggleActivatedUsers(id:number | null):Observable< IToggleData | any>{
    return this._HttpClient.put(`Users/${ id}` , {id : 'id'})
  }
}
