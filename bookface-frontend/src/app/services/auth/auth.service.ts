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
    this.httpClient
    .get<any>('http://192.168.0.18:8080/users/' + id)
    .subscribe(
      (response) => {
          this.user = response.user;
          this.auth = true;
          this.emitUserSubject();
          this.emitAuthSubject();
      },
      () => {
        this.router.navigate(['login']);
      }

    );
  }

  getUserAfterCreate(url: string) {
    this.httpClient
    .get<any>(url)
    .subscribe(
      (response) => {
          this.user = response.user;
          this.auth = true;
          this.emitUserSubject();
          this.emitAuthSubject();
      },
      () => {
        this.router.navigate(['login']);
      }

    );
  }
}
