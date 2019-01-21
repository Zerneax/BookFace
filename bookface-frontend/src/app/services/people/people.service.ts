import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  getPeople() {
    return this.httpClient
    .get<Array<User>>('http://192.168.0.18:8080/people');
  }
}
