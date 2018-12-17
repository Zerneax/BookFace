import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth/auth.service';
import { User } from '../models/user/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser = new User();
  currentUserSubscription: Subscription;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.userSubject.subscribe(
      (user: User) => {this.currentUser = user;}
    );
  }

  save() {
    this.authService.emitUserSubject();
    this.router.navigate(['home']);
  }

}
