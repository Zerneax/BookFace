import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';
import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

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
