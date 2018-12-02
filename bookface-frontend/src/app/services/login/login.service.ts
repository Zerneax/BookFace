import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(mail: string) {
    return this.httpClient
    .get<any>('http://192.168.0.18:8080/users/'+ mail);
  }
}
