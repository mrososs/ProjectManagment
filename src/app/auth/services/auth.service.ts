import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../../core/interfaces/user';

Observable;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  // onChangingPassword():Observable<any>{
  //   return this._HttpClient.put(`https://upskilling-egypt.com:3003/api/v1/Users/ChangePassword`   )
  // }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Example: Check if token exists
  }
  register(data: any): Observable<any> {
    return this._HttpClient.post('Users/Register', data);
  }
  forgetPassword(email: string): Observable<string> {
    return this._HttpClient.post<string>('Users/Reset/Request', { email });
  }

  verify(data: any): Observable<any> {
    return this._HttpClient.put('Users/verify', data);
  }
  onResetPassword(UserParams: any): Observable<any> {
    return this._HttpClient.post(`Users/Reset/Request`, UserParams );
  }
  login(user: ILogin): Observable<ILogin> {
    return this._HttpClient.post<ILogin>(`Users/Login`, user);
  }
}
