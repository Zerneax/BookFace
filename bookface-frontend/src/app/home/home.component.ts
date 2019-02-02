import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './../services/auth/auth.service';
import {PostService} from './../services/post/post.service';


import { User } from './../models/user/user';
import { Post } from '../models/post/post';
import { Router } from '@angular/router';
import { PeopleService } from '../services/people/people.service';

import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { Friendship } from '../models/friendship/friendship';
import { ErrorService } from '../services/error/error.service';
import { ErrorMessage } from '../models/error/error';
import { InvitationService } from '../services/invitation/invitation.service';

export interface IContext {
    data:string;
}

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
  waitingFriendship: number;
  waitingFriendshipList: Array<Friendship>;
  waitingFriendshipSubscription: Subscription;

  @ViewChild('modalTemplate')
    public modalTemplate:ModalTemplate<IContext, string, string>

  constructor(private authService: AuthService,
    private postService: PostService,
    private peopleService: PeopleService,
    private modalService: SuiModalService,
    private errorService: ErrorService,
    private invitationService: InvitationService,
    private router: Router) {
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
  }


  init() {
    this.currentUser = this.authService.getCurrentUser();

    this.waitingFriendshipSubscription = this.invitationService.waitingFriendshipSubject.subscribe(
      (invitations: Array<Friendship>) => {
        this.waitingFriendshipList = invitations;
        this.waitingFriendship = invitations.length;
      }
    );

    this.postService.getPosts(this.currentUser.id).subscribe(
      (response) => {
        this.postService.initPosts(response);
      }, (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "The service to get your post is unvalaible for the moment. Please try later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );

    this.postsSubscription = this.postService.postsSubject.subscribe(
      (posts: Array<Post>) => {this.posts = posts;}
    );

    this.invitationService.getWaitingFriendship(this.currentUser.id);
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
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "The service to create a post is unavaible for the moment. Please try later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );
  }

  displayProfile() {
    this.router.navigate(['profile']);
  }

  // getWaitingFriendship() {
  //   this.peopleService.getWaitingFriendship(this.currentUser.id).subscribe(
  //     (response) => {
  //       this.waitingFriendship = response.length;
  //       this.waitingFriendshipList = response;
  //     },
  //     (error) => {
  //       this.waitingFriendship = -1;
  //     }
  //   )
  // }

  public open(dynamicContent:string = "Example") {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(result => {console.log("approve");})
        .onDeny(result => { console.log("deny");});
}

}
