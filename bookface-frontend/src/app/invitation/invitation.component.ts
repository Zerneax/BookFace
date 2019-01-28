import { Component, OnInit, Input } from '@angular/core';
import { Friendship } from '../models/friendship/friendship';
import { PeopleService } from '../services/people/people.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  @Input() friendShip: Friendship;
  private lastName: string;
  private firstName: string;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getUserLight(this.friendShip.idUser1).subscribe(
      (response) => {
        this.lastName = response.lastName;
        this.firstName = response.firstName;
      },
      (error) => {
        console.log("error");
      }
    );
  }

}
