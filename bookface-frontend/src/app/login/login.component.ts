import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';
import { AuthService } from './../services/auth/auth.service';
import { ErrorMessage } from './../models/error/error';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.errorMessage.header = "Your mail or password is invalid.";
    this.errorMessage.information = "If you don't have any account please create one !";
    this.errorMessage.display = true;
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
              this.errorMessage.header = "Oops your mail or password is invalid !";
              this.errorMessage.information = "";
              this.errorMessage.display = true;
            }

          );

        }else {
          this.errorMessage.header = "Oops your mail or password is invalid !";
          this.errorMessage.information = "";
          this.errorMessage.display = true;
        }
      }, (error) => {
        this.errorMessage.header = "Oops your mail or password is invalid !";
        this.errorMessage.information = "";
        this.errorMessage.display = true;
      }
    );
  }

}
