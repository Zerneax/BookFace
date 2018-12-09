import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShaService } from './../sha/sha.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
    private shaService: ShaService) { }

  login(mail: string) {
    return this.httpClient
    .get<any>('http://192.168.0.18:8080/users/'+ mail + '/login');
  }

  checkPassword(password: string, passwordDb: string) {
    let shaPassword = this.shaService.getSha(password);

    if(passwordDb === shaPassword)
      return true;
    else
      return false;
  }
}
