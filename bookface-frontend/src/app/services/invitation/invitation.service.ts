import { Injectable, OnInit } from '@angular/core';
import { Friendship } from 'src/app/models/friendship/friendship';
import { Subject } from 'rxjs';
import { PeopleService } from '../people/people.service';
import { ErrorService } from '../error/error.service';
import { ErrorMessage } from 'src/app/models/error/error';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class InvitationService implements OnInit{

  private waitingFriendship: Array<Friendship>;
  waitingFriendshipSubject= new Subject<Array<Friendship>>();
  private currentUser : User;

  constructor(private peopleService: PeopleService,
    private errorService: ErrorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.emitWaitingFriendShip();
    this.currentUser = this.authService.getCurrentUser();
    this.getWaitingFriendship(this.currentUser.id);
  }

  emitWaitingFriendShip() {
    this.waitingFriendshipSubject.next(this.waitingFriendship);
  }

  getWaitingFriendship(id) {
    this.peopleService.getWaitingFriendship(id).subscribe(
      (response) => {
        this.waitingFriendship = response;
        this.emitWaitingFriendShip();
      },
      (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "The service to create a post is unavaible for the moment. Please try later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    )
  }

  removeWaitingFriendship(friendship) {
    const index = this.waitingFriendship.indexOf(friendship, 0);
    if(index >= 0) {
      this.waitingFriendship.splice(index, 1);
      this.emitWaitingFriendShip();
    }
  }
}
