import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

Observable

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }


  register(data: any): Observable<any> {
    return this._HttpClient.post('Users/Register', data);
  }  
  
}
