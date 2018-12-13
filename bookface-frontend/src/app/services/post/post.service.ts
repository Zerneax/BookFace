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

  addPost(content:string, author: string) {
    const post = new Post();
    post.content = content;
    post.like = 0;
    post.author = author;

    return this.httpClient
      .post('http://192.168.0.18:8080/posts', {post: post});
  }

  emitPostsSubject() {
    this.postsSubject.next(this.posts);
  }

  getPosts(author: string) {
    this.httpClient
    .get<Array<Post>>('http://192.168.0.18:8080/posts/' + author)
    .subscribe(
      (response) => {
        this.posts = response;
        this.emitPostsSubject();
        console.log("get posts OK !");
      }, (error) => {
        alert("Error ");
      }
    );
  }

  like(idPost: string) {
    return this.httpClient
    .put<Post>('http://192.168.0.18:8080/posts/'+ idPost, {});
  }

  getIndexOfPost(element, idPost) {
    return element.id === idPost;
  }

  delete(postToDelete: Post) {
    var index = this.posts.findIndex(element => element.post.id  === postToDelete.id);
    this.posts.splice(index, 1);
  }
}
