import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './../services/auth/auth.service';
import {WebSocketService} from './../services/webSocket/web-socket.service';
import { User } from './../models/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser = new User();
  currentUserSubscription: Subscription;

  constructor(private authService: AuthService,
    private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.userSubject.subscribe(
      (user: User) => {this.currentUser = user;}
    );
  }

  send() {
    var msg = {} as any;
    msg.message = "bonjour"
    this.webSocketService.sendMessage(JSON.stringify({'message': "bonjour"}));
  }

}
