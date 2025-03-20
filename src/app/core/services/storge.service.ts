import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StorgeService {
authUser : User | undefined;
constructor() { }


}
