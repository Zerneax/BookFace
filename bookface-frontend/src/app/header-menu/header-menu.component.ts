import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';
import { AuthService } from './../services/auth/auth.service';
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

  constructor(private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.authSubscription = this.authService.authSubject.subscribe(
      (auth: boolean) => {this.auth = auth;}
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
        if(response.password === this.loginForm.value['password']) {
          this.authService.getUser(response.id);
          this.router.navigate(['home']);
        }else {
          this.router.navigate(['login']);
        }
      }, () => {
        this.router.navigate(['login']);
      }
    );
  }
}
