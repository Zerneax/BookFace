import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new Subject<User>();
  private user: User;

  constructor(private httpClient: HttpClient) { }
}
