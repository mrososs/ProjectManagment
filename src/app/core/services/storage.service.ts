import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private userRole: string | null = null; // Store user role

  constructor() {
    this.loadUserRole();
  }

  /** Load user role from token */
  public loadUserRole(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userRole = decodedToken.userGroup; // Extract role from token
        localStorage.setItem('role', this.userRole || ''); // Store role in localStorage
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }

  /** Check if the user is logged in */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /** Get user role */
  getUserRole(): string | null {
    return this.userRole || localStorage.getItem('role');
  }

  /** Check if user is an Employee */
  isEmployee(): boolean {
    return this.getUserRole() === 'Employee';
  }

  /** Check if user is a Manager */
  isManager(): boolean {
    return this.getUserRole() === 'Manager';
  }
}
