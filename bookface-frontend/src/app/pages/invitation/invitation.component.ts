import { Component, OnInit, Input } from '@angular/core';
import { Friendship } from '../../models/friendship/friendship';
import { PeopleService } from '../../services/people/people.service';
import { ErrorService } from '../../services/error/error.service';
import { ErrorMessage } from '../../models/error/error';
import { InvitationService } from '../../services/invitation/invitation.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  @Input() friendShip: Friendship;
  public lastName: string;
  public firstName: string;
  public show: boolean = true;

  constructor(private peopleService: PeopleService,
    private errorService: ErrorService,
    private invitationService: InvitationService
  ) { }

  ngOnInit() {
    this.peopleService.getUserLight(this.friendShip.idUser1).subscribe(
      (response) => {
        this.lastName = response.lastName;
        this.firstName = response.firstName;
      },
      (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "Please try later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );
  }

  approveFriendship() {
    this.peopleService.approveFriendship(this.friendShip.id).subscribe(
      (response)=> {
        this.show = false;
        this.invitationService.removeWaitingFriendship(this.friendShip);
      },
      (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "The service is unvalaible for the moment. Please try later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    )
  }

  refuseFriendship() {
    this.peopleService.refuseFriendship(this.friendShip.id).subscribe(
      (response)=> {
        this.show = false;
        this.invitationService.removeWaitingFriendship(this.friendShip);
      },
      (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "The service is unvalaible for the moment. Please try later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    )
  }

}
