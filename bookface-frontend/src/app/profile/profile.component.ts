import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth/auth.service';
import { User } from '../models/user/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser = new User();
  birthday: Date;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.birthday = new Date(this.currentUser.birthday);
    // console.log(moment(this.currentUser.birthday, "yyyy-MM-ddTHH:mm:sssz").format());
    // this.birthday = new Date(this.currentUser.birthday);//moment.parseZone(this.currentUser.birthday).toDate();
    // this.birthday = moment(this.currentUser.birthday, "yyyy-MM-dd")..toDate();
  }

  save() {
    this.authService.emitUserSubject();
    this.router.navigate(['home']);
  }

}
