import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  updateUser(user: User) {
    return this.httpClient
      .put('http://192.168.0.18:8080/users', {user : user});
  }
}
