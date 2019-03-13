import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './../../app-routing.module';


import { HeaderMenuComponent } from './header-menu.component';
import {NotFoundComponent} from './../not-found/not-found.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { SignInModule } from '../sign-in/sign-in.module';
import { PeopleModule } from '../people/people.module';
import { HomeModule } from '../home/home.module';
import { ErrorModule } from '../error/error.module';
import { LoginModule } from '../login/login.module';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user';
import { PeopleService } from 'src/app/services/people/people.service';
import { of, throwError } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;
  let authService: AuthService;
  let peopleService: PeopleService;
  let loginService: LoginService;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        SuiModule,
        AngularFontAwesomeModule,
        PeopleModule,
        HomeModule,
        ErrorModule,
        LoginModule,
        SignInModule
      ],
      declarations: [
        HeaderMenuComponent,
        NotFoundComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuComponent);
    component = fixture.componentInstance;

    authService = TestBed.get(AuthService);
    peopleService = TestBed.get(PeopleService);
    loginService = TestBed.get(LoginService);
    router = TestBed.get(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test authSubject', () => {
    authService.authSubject.next(true);
    expect(component.auth).toBeTruthy();
  });

  it('should test userSubject ok', () => {

    let user: User = new User();
    user.lastName = "test";
    user.firstName = "test";
    user.id = "1";
    user.mail = "test@test.com";
    user.password = "password";
    user.birthday = new Date("10/10/1980");
    user.dateRegister = "10/10/1980";

    let user2: User = new User();
    user2.lastName = "test 2";
    user2.firstName = "test 2";
    user2.id = "2";
    user2.mail = "test@test.com";
    user2.password = "password";
    user2.birthday = new Date("10/10/1980");
    user2.dateRegister = "10/10/1980";

    let peoples: Array<User> = new Array();

    peoples.push(user);
    peoples.push(user2);

    spyOn(peopleService, 'getPeoples').and.callFake(() => {return of(peoples);});

    authService.userSubject.next(user);
    expect(component.user).toBeDefined();
    expect(component.peoples.length).toEqual(1);
  });

  it('should test login ok', () => {
    let response: any = {};
    response.password = "123456";
    response.id = "1";

    spyOn(loginService, 'login').and.callFake(() => {return of(response);});
    spyOn(loginService, 'checkPassword').and.callFake(() => {return true;});
    spyOn(authService, 'getUser').and.callFake(() => {return of({user: new User()});});
    spyOn(authService, 'authenticationSuccess').and.callFake(() => {});
    spyOn(router, 'navigate').and.callThrough();
    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(loginService.checkPassword).toHaveBeenCalled();
    expect(authService.getUser).toHaveBeenCalled();
    expect(authService.authenticationSuccess).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should test login password false', () => {
    let response: any = {};
    response.password = "123456";
    response.id = "1";

    spyOn(loginService, 'login').and.callFake(() => {return of(response);});
    spyOn(loginService, 'checkPassword').and.callFake(() => {return false;});
    spyOn(router, 'navigate').and.callThrough();
    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(loginService.checkPassword).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should test login ko', () => {

    spyOn(loginService, 'login').and.callFake(() => {return throwError('erreur');});
    spyOn(router, 'navigate').and.callThrough();
    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should test logout', () => {

    spyOn(authService, 'logout').and.callFake(() => {});
    component.logout();

    expect(component.peoples).toEqual(new Array());
    expect(authService.logout).toHaveBeenCalled();
  });

});
