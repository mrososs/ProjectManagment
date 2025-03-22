import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

Observable

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  // onChangingPassword():Observable<any>{
  //   return this._HttpClient.put(`https://upskilling-egypt.com:3003/api/v1/Users/ChangePassword`   )
  // }

  onResetPassword(UserParams:any):Observable<any>{
    return this._HttpClient.post(`https://upskilling-egypt.com:3003/api/v1/Users/Reset` , {params: UserParams} )
  }




}
