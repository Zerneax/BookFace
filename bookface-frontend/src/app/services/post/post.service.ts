import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './../../models/post/post';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {

  postsSubject = new Subject<Array<Post>>();
  private posts: Array<Post>;


  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  createPost(post:Post) {
    return this.httpClient
      .post('http://192.168.0.18:8080/posts', {post: post}, {observe: 'response'});
  }

  emitPostsSubject() {
    this.postsSubject.next(this.posts);
  }

  addingPostToArray(post: Post) {
    this.posts.push(post);
    this.emitPostsSubject();
  }

  initPosts(posts: Array<Post>) {
    this.posts = posts;
    this.emitPostsSubject();
  }

  getPosts(author: string) {
    return this.httpClient
    .get<Array<Post>>('http://192.168.0.18:8080/posts/all/' + author);
  }

  getPost(url: any) {
    return this.httpClient
    .get<Post>(url);
  }

  like(idPost: string, author: string) {
    return this.httpClient
    .put<Post>('http://192.168.0.18:8080/posts/'+ idPost + "?like=" + author, {});
  }

  getIndexOfPost(element, idPost) {
    return element.id === idPost;
  }

  delete(postToDelete: Post) {

    this.httpClient
    .delete('http://192.168.0.18:8080/posts/'+ postToDelete.id)
    .subscribe(
      (response) => {
        console.log("test");
      }, (error) => {
        console.log("test " + error);
      }

    );

    var index = this.posts.findIndex(element => element.post.id  === postToDelete.id);
    this.posts.splice(index, 1);

  }
}
