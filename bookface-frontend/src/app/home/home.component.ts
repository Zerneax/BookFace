import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './../services/auth/auth.service';
import {PostService} from './../services/post/post.service';

import { User } from './../models/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser = new User();
  currentUserSubscription: Subscription;
  content: string;

  constructor(private authService: AuthService,
    private postService: PostService) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.userSubject.subscribe(
      (user: User) => {this.currentUser = user;}
    );
  }

  addPost() {
    this.postService.addPost(this.content, this.currentUser.id)
    .subscribe(
      () => { this.content = "";},
      (error) => {
        alert("error : " + error);
      }
    );
  }

}
