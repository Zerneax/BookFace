import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder) { }

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
        if(response.password === this.loginForm.value['password']) {
          alert("Login succes !!!");
        }else {
          alert("aller vers /login");
        }
      }, (error) => {
        alert("aller vers /login");
      }
    );
    console.log("test : "+ this.loginForm.value['mail'] + " | " + this.loginForm.value['password']);
  }
}
