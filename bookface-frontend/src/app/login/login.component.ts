import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';
import { ErrorMessage } from './../models/error/error';

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
    private formBuilder: FormBuilder) { }

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
        if(response.password === this.loginForm.value['password']) {
          alert("Login succes !!!");
        }else {
          alert("aller vers /login");
          this.errorMessage.header = "Oops your mail or password is invalid !";
          this.errorMessage.information = "";
          this.errorMessage.display = true;
        }
      }, (error) => {
        alert("aller vers /login");
        this.errorMessage.header = "Oops your mail or password is invalid !";
        this.errorMessage.information = "";
        this.errorMessage.display = true;
      }
    );
    console.log("test : "+ this.loginForm.value['mail'] + " | " + this.loginForm.value['password']);
  }

}
