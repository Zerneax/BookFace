import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './../services/auth/auth.service';
import {PostService} from './../services/post/post.service';


import { User } from './../models/user/user';
import { Post } from '../models/post/post';
import { Router } from '@angular/router';

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
    private postService: PostService,
    private router: Router) {
  }

  ngOnInit() {
    this.init();
    console.log("test init");
  }

  ngOnDestroy() {
    console.log("test");
  }


  init() {
    this.currentUser = this.authService.getCurrentUser();
    this.postService.getPosts(this.currentUser.id).subscribe(
      (response) => {
        this.postService.initPosts(response);
      }, (error) => {
        alert("error : " + error);
      }
    );

    this.postsSubscription = this.postService.postsSubject.subscribe(
      (posts: Array<Post>) => {this.posts = posts;}
    );
  }

  addPost() {
    const post = new Post();
    post.content = this.content;
    post.author = this.currentUser.id;

    this.postService.createPost(post)
    .subscribe(
      (response) => {
        this.postService.getPost(response.headers.get('Location')).subscribe(
          (post) => { this.content =""; this.postService.addingPostToArray(post); }
        );
      },
      (error) => {
        alert("error : " + error);
      }
    );
  }

  displayProfile() {
    this.router.navigate(['profile']);
  }



}
