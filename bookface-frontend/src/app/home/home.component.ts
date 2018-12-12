import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './../services/auth/auth.service';
import {PostService} from './../services/post/post.service';

import { User } from './../models/user/user';
import { Post } from '../models/post/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser = new User();
  currentUserSubscription: Subscription;
  content: string;
  posts = new Array<Post>();
  postsSubscription: Subscription;

  constructor(private authService: AuthService,
    private postService: PostService) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.userSubject.subscribe(
      (user: User) => {this.currentUser = user; this.postService.getPosts(this.currentUser.id);}
    );

    this.postsSubscription = this.postService.postsSubject.subscribe(
      (posts: Array<Post>) => {this.posts = posts;}
    );
  }



  addPost() {
    this.postService.addPost(this.content, this.currentUser.id)
    .subscribe(
      () => {
        this.content = "";
        this.postService.getPosts(this.currentUser.id);
      },
      (error) => {
        alert("error : " + error);
      }
    );
  }

}
