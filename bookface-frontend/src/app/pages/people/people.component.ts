import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people/people.service';
import { Router } from '@angular/router';
import { Post } from '../../models/post/post';
import { PostService } from '../../services/post/post.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../services/error/error.service';
import { ErrorMessage } from '../../models/error/error';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  currentPeople: string;
  currentPeopleSubscription: Subscription;
  posts: Array<Post> = new Array<Post>();

  canAdd: boolean = true;

  constructor(private peopleService: PeopleService,
    private postService: PostService,
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.currentPeople = this.peopleService.currentPeople();
    this.loadPosts();
    this.getFriendship();

    this.currentPeopleSubscription = this.peopleService.peopleSubject.subscribe(
      (people: string) => {this.currentPeople = people; this.loadPosts(); this.getFriendship();}
    );
  }

  goHome() {
    this.router.navigate(['home']);
  }

  loadPosts() {
    this.postService.getPosts(this.currentPeople).subscribe(
      (response) => {
        this.posts = response;
      }, (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "We can't retrieve your posts. Retry later please !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );
  }

  getFriendship() {
    this.peopleService.getFriendship(this.authService.getCurrentUser().id, this.currentPeople).subscribe(
      (response) => {
        this.canAdd = false;
      }, (error) => {
        this.canAdd = true;
      }
    )
  }

  askToBefriends() {
    this.peopleService.askToBefriends(this.authService.getCurrentUser().id, this.currentPeople).subscribe(
      (response) => {
        console.log("ok");
      }, (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "We can't send an invitation to this person for the moment. Please try later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );
  }


}
