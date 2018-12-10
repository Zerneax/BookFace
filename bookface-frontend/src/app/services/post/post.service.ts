import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './../../models/post/post';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {

  constructor(
    private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  addPost(content:string, author: string) {
    const post = new Post();
    post.content = content;
    post.like = 0;
    post.author = author;

    return this.httpClient
      .post('http://192.168.0.18:8080/posts', {post: post});
  }
}
