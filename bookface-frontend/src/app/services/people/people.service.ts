import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user/user';
import { Subject } from 'rxjs';
import { Post } from 'src/app/models/post/post';
import { Friendship } from 'src/app/models/friendship/friendship';

@Injectable({
  providedIn: 'root'
})
export class PeopleService implements OnInit{


  peopleSubject = new Subject<string>();
  private people: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.peopleSubject.next(this.people);
  }

  getPeoples() {
    return this.httpClient
    .get<Array<User>>('http://192.168.0.18:8080/people');
  }

  emitPeopleSubject() {
    this.peopleSubject.next(this.people);
  }

  setPeople(id: string) {
    this.people = id;
    this.emitPeopleSubject();
  }

  currentPeople() {
    return this.people;
  }

  getPostsOfPeople() {
    return this.httpClient
    .get<Array<Post>>('');
  }

  askToBefriends(currentUser, people) {
    return this.httpClient
      .post('http://192.168.0.18:8080/friendship', {currentUser: currentUser, people: people});
  }

  getFriendship(currentUser, people) {
    return this.httpClient
    .get<Friendship>('http://192.168.0.18:8080/friendship?currentUser=' + currentUser + "&people=" + people);
  }

  getWaitingFriendship(currentUser) {
    return this.httpClient
    .get<any>('http://192.168.0.18:8080/friendship/waiting/' + currentUser);
  }

  getUserLight(idUser) {
    return this.httpClient
    .get<any>('http://192.168.0.18:8080/users/' + idUser + '/light');
  }
}
