import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { User } from '../../models/user/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ErrorMessage } from 'src/app/models/error/error';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser = new User();
  birthday: Date;

  constructor(private authService: AuthService,
    private profileService: ProfileService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.birthday = new Date(this.currentUser.birthday);
  }

  save() {
    this.profileService.updateUser(this.currentUser).subscribe(
      (response) => {
        this.router.navigate(['home']);
      }, (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error has occured !";
        errorMessage.information = "Please try to login !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );
  }

  goHome() {
    this.router.navigate(['home']);
  }
}
