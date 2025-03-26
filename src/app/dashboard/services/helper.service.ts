import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUpdateUserData, User } from '../../core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http:HttpClient) { }
  private profileImageSource = new BehaviorSubject<string>('');
  currentProfileImage = this.profileImageSource.asObservable();

  private userNameSource = new BehaviorSubject<string>('User');
  currentUserName = this.userNameSource.asObservable();

  private userMailSource = new BehaviorSubject<string>('Upskilling@gmail.com');
  currentUserMail = this.userMailSource.asObservable();
  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<User>(`Users/currentUser`, { headers });
  }
  updateUser(data:FormData):Observable<IUpdateUserData>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<IUpdateUserData>(`Users`, data , {headers});
  }
  updateProfileImage(imagePath: string) {
    if (this.profileImageSource.getValue() !== imagePath) {
      this.profileImageSource.next(imagePath);
    }
  }

  updateUserName(name: string) {
    if (this.userNameSource.getValue() !== name) {
      this.userNameSource.next(name);
    }
  }
  updateUserMail(email: string) {
    if (this.userMailSource.getValue() !== email) {
      this.userMailSource.next(email);
    }
  }
}
