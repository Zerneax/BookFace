import { Injectable, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{


  userSubject = new Subject<User>();
  private user: User;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.userSubject.next(this.user);
  }

  emitUserSubject() {
    this.userSubject.next(this.user);
  }

  login(user: User) {
    this.user = user;
    this.emitUserSubject();
  }
}
