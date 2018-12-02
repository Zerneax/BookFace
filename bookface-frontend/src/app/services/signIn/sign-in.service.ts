import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  // TODO : if create account is ok then set user in auth

  constructor(private httpClient: HttpClient) { }

  checkMailAlreadyUsed(mail: string) {
    return this.httpClient
    .get<any>('http://192.168.0.18:8080/users?mail='+ mail);
  }

  createAccount(user: User) {
    return this.httpClient
      .post('http://192.168.0.18:8080/users', {user : user.toJson()});
  }
}
