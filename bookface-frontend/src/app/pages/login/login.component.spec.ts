import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './../../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {LoginComponent} from './login.component';
import {NotFoundComponent} from './../not-found/not-found.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { LoginService } from '../../services/login/login.service';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ShaService } from '../../services/sha/sha.service';
import { HomeModule } from '../home/home.module';
import { HeaderMenuModule } from '../header-menu/header-menu.module';
import { SignInModule } from '../sign-in/sign-in.module';
import { ErrorModule } from '../error/error.module';
import { PeopleModule } from '../people/people.module';
import { APP_BASE_HREF } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppRoutingModule,
        AngularFontAwesomeModule,
        ReactiveFormsModule,
        HomeModule,
        HeaderMenuModule,
        SignInModule,
        ErrorModule,
        PeopleModule
      ],
      declarations: [
        LoginComponent,
        NotFoundComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing login all sucess', () => {

    const shaService = fixture.debugElement.injector.get(ShaService);
    spyOn(shaService, 'getSha').and.returnValue("1234");

    const loginService = fixture.debugElement.injector.get(LoginService);
    spyOn(loginService, 'login').and.returnValue(of({'id': '1234', 'password': '1234'}));

    spyOn(loginService, 'checkPassword').and.callThrough();

    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getUser').and.returnValue(of({'id': '1234', 'password': '1234'}));
    spyOn(authService, 'authenticationSuccess').and.callThrough();

    component.loginForm.value['password'] = '1234';
    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(loginService.checkPassword).toHaveBeenCalledWith('1234','1234');
    expect(authService.getUser).toHaveBeenCalled();
    expect(authService.authenticationSuccess).toHaveBeenCalled();
  });

  it('testing login getUser in error', () => {

    const shaService = fixture.debugElement.injector.get(ShaService);
    spyOn(shaService, 'getSha').and.returnValue("1234");

    const loginService = fixture.debugElement.injector.get(LoginService);
    spyOn(loginService, 'login').and.returnValue(of({'id': '1234', 'password': '1234'}));

    spyOn(loginService, 'checkPassword').and.callThrough();

    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getUser').and.returnValue(throwError('error'));

    component.loginForm.value['password'] = '1234';
    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(loginService.checkPassword).toHaveBeenCalledWith('1234','1234');
    expect(authService.getUser).toHaveBeenCalled();
  });

  it('testing login password is wrong', () => {

    const shaService = fixture.debugElement.injector.get(ShaService);
    spyOn(shaService, 'getSha').and.returnValue("123456");

    const loginService = fixture.debugElement.injector.get(LoginService);
    spyOn(loginService, 'login').and.returnValue(of({'id': '1234', 'password': '1234'}));

    spyOn(loginService, 'checkPassword').and.callThrough();

    component.loginForm.value['password'] = '123456';
    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(loginService.checkPassword).toHaveBeenCalledWith('123456','1234');
  });

  it('testing login login in error', () => {

    const loginService = fixture.debugElement.injector.get(LoginService);
    spyOn(loginService, 'login').and.returnValue(throwError('error'));

    component.login();

    expect(loginService.login).toHaveBeenCalled();
  });

});
