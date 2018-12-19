import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';
import { AuthService } from './../services/auth/auth.service';
import { User } from './../models/user/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  loginForm: FormGroup;
  auth: boolean;
  authSubscription: Subscription;
  user: User;
  userSubscription: Subscription;

  constructor(private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.authSubscription = this.authService.authSubject.subscribe(
      (auth: boolean) => {this.auth = auth;}
    );

    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {this.user = user;}
    );


  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.loginService.login(this.loginForm.value['mail'])
    .subscribe(
      (response) => {
        if(this.loginService.checkPassword(this.loginForm.value['password'], response.password)) {
          this.authService.getUser(response.id).subscribe(
            (responseUser) => {
              this.authService.authenticationSuccess(responseUser.user);
              this.router.navigate(['home']);
            }, (error) => {
              this.router.navigate(['login']);
            }
          );
        }else {
          this.router.navigate(['login']);
        }
      }, () => {
        this.router.navigate(['login']);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
