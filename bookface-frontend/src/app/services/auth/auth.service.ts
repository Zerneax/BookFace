import { Injectable, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{


  userSubject = new Subject<User>();
  private user: User;
  authSubject = new Subject<Boolean>();
  private auth: Boolean;


  constructor(private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.userSubject.next(this.user);
  }

  emitUserSubject() {
    this.userSubject.next(this.user);
  }

  emitAuthSubject() {
    this.authSubject.next(this.auth);
  }

  getUser(id: string) {
    return this.httpClient
    .get<any>('http://192.168.0.18:8080/users/' + id);
  }

  getUserAfterCreate(url: string) {
    return this.httpClient
    .get<any>(url);
  }

  getCurrentUser() {
    return this.user;
  }

  authenticationSuccess(user: User) {
    this.user = user;
    this.auth = true;
    this.emitUserSubject();
    this.emitAuthSubject();
  }

  logout() {
    this.user = new User();
    this.auth = false;
    this.emitUserSubject();
    this.emitAuthSubject();
    this.router.navigate(['']);
  }

  isAuth() {
    if(this.auth) return true;
    else return false;
  }

  getCompleteNameOfCurrentUser() {
    return this.user.lastName + "." + this.user.firstName;
  }
}
