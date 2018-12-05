import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './../services/auth/auth.service';
import { User } from './../models/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser = new User();
  currentUserSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.userSubject.subscribe(
      (user: User) => {this.currentUser = user;}
    );
  }

}
