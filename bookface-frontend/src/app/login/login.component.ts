import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';
import { AuthService } from './../services/auth/auth.service';
import { ErrorMessage } from './../models/error/error';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginHeaderFail: boolean = true;
  errorMessage: ErrorMessage = new ErrorMessage();

  constructor(private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.initForm();
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
          this.authService.getUser(response.id)
          .subscribe(
            (responseUser) => {
              this.authService.authenticationSuccess(responseUser.user);
              this.router.navigate(['home']);
            }, (error) => {
              const errorMessage = new ErrorMessage();
              errorMessage.header = "Oops an error was occured";
              errorMessage.information = "Please try later !";
              this.errorService.displayErrorMessage(errorMessage);
            }

          );

        }else {
          const errorMessage = new ErrorMessage();
          errorMessage.header = "Oops your mail or password is invalid !";
          errorMessage.information = "Please retry !";
          this.errorService.displayErrorMessage(errorMessage);
        }
      }, (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an errror was occured !";
        errorMessage.information = "Please retry later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );
  }

}
