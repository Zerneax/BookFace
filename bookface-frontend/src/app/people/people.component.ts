import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people/people.service';
import { Router } from '@angular/router';
import { Post } from '../models/post/post';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  currentPeople: string;
  posts: Array<Post>;

  constructor(private peopleService: PeopleService,
    private postService: PostService,
    private router: Router) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.currentPeople = this.peopleService.currentPeople();
    this.postService.getPosts(this.currentPeople).subscribe(
      (response) => {
        this.posts = response;
      }, (error) => {
        alert("error : " + error);
      }
    );
  }

  goHome() {
    this.router.navigate(['home']);
  }
}
