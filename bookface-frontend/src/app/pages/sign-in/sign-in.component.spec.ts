import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from '../post/post.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProfileComponent } from '../profile/profile.component';
import { PeopleComponent } from './../people/people.component';
import { ErrorComponent } from './../error/error.component';
import { InvitationComponent } from './../invitation/invitation.component';

import * as moment from 'moment';
import { SignInService } from '../../services/signIn/sign-in.service';
import { ErrorMessage } from '../../models/error/error';
import { of, Observable, throwError } from 'rxjs';
import { ShaService } from '../../services/sha/sha.service';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorService } from '../../services/error/error.service';

import { User } from '../../models/user/user';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        SuiModule
      ],
      declarations: [
        SignInComponent,
        HeaderMenuComponent,
        HomeComponent,
        PostComponent,
        LoginComponent,
        NotFoundComponent,
        ProfileComponent,
        PeopleComponent,
        ErrorComponent,
        InvitationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form should be init', () => {
    expect(component.signInForm).not.toBeNull();
    expect(component.signInForm.value['lastName']).toEqual('');
    expect(component.signInForm.value['firstName']).toEqual('');
    expect(component.signInForm.value['mail']).toEqual('');
    expect(component.signInForm.value['password']).toEqual('');
    expect(component.signInForm.value['birthday']).toEqual('');
    expect(component.signInForm.value['gender']).toEqual('');
  });

  it('testing checkBirthday with no value', () => {
    const result = component.checkBirthday(component.signInForm.value['birthday']);
    expect(result).toBeNull();
  });

  it('testing checkBirthday under 13', () => {
    let myFormControl = new FormControl(moment());
    let result = component.checkBirthday(myFormControl);
    expect(result).toEqual({'isUnder13': true});
  });

  it('testing checkBirthday up to 13', () => {
    let myFormControl = new FormControl(moment().subtract(18, 'years'));
    const result = component.checkBirthday(myFormControl);
    expect(result).toBeNull();
  });

  it('testing checkMailAlreadyUsed not used', () => {

    const signInService = fixture.debugElement.injector.get(SignInService);
    spyOn(signInService, 'checkMailAlreadyUsed').and.returnValue(of({'available': true}));

    component.signInForm.controls['mail'] = new FormControl();
    component.signInForm.controls['mail'].setErrors(null);
    component.checkMailAlreadyUsed();


  });

  it('testing checkMailAlreadyUsed already used', () => {

    const signInService = fixture.debugElement.injector.get(SignInService);
    spyOn(signInService, 'checkMailAlreadyUsed').and.returnValue(of({'available': false}));

    component.signInForm.controls['mail'] = new FormControl();
    component.signInForm.controls['mail'].setErrors(null);
    component.checkMailAlreadyUsed();

  });

  it('testing checkMailAlreadyUsed already used', () => {

    const signInService = fixture.debugElement.injector.get(SignInService);
    spyOn(signInService, 'checkMailAlreadyUsed').and.returnValue(of({'available': false}));

    component.signInForm.controls['mail'] = new FormControl();
    component.signInForm.controls['mail'].setErrors(null);
    component.checkMailAlreadyUsed();


  });

  it('testing checkMailAlreadyUsed service error', () => {

    const signInService = fixture.debugElement.injector.get(SignInService);
    spyOn(signInService, 'checkMailAlreadyUsed').and.returnValue(throwError('Some error object'));

    component.signInForm.controls['mail'] = new FormControl();
    component.signInForm.controls['mail'].setErrors(null);
    component.checkMailAlreadyUsed();

  });

  it('testing createaccount service createAccount in error', () => {

    const shaService = fixture.debugElement.injector.get(ShaService);
    spyOn(shaService, 'getSha').and.returnValue("123456");

    const signInService = fixture.debugElement.injector.get(SignInService);
    spyOn(signInService, 'createAccount').and.returnValue(throwError('Some error object'));

    component.signInForm.value['birthday'] = moment().toDate();
    component.createAccount();


  });

  it('testing createaccount all sucess', () => {
      const shaService = fixture.debugElement.injector.get(ShaService);
      spyOn(shaService, 'getSha').and.returnValue("123456");

      let httpResponse = new HttpResponse();
      httpResponse.headers.set('Location', '123');

      const signInService = fixture.debugElement.injector.get(SignInService);
      spyOn(signInService, 'createAccount').and.returnValue(of(httpResponse));//{'headers': [{'location': '123'}]}

      const authService = fixture.debugElement.injector.get(AuthService);
      spyOn(authService, 'getUserAfterCreate').and.returnValue(of(new User()));
      spyOn(authService, 'authenticationSuccess').and.callThrough();

      component.signInForm.value['birthday'] = moment().toDate();
      component.createAccount();

      expect(signInService.createAccount).toHaveBeenCalled();
      expect(authService.getUserAfterCreate).toHaveBeenCalled();
      expect(authService.authenticationSuccess).toHaveBeenCalled();
  });

  it('testing createaccount and getUserAfterCreate in error', () => {
      const shaService = fixture.debugElement.injector.get(ShaService);
      spyOn(shaService, 'getSha').and.returnValue("123456");

      let httpResponse = new HttpResponse();
      httpResponse.headers.set('Location', '123');

      const signInService = fixture.debugElement.injector.get(SignInService);
      spyOn(signInService, 'createAccount').and.returnValue(of(httpResponse));

      const authService = fixture.debugElement.injector.get(AuthService);
      spyOn(authService, 'getUserAfterCreate').and.returnValue(throwError('error'));

      component.signInForm.value['birthday'] = moment().toDate();
      component.createAccount();

      expect(signInService.createAccount).toHaveBeenCalled();
      expect(authService.getUserAfterCreate).toHaveBeenCalled();
  });

});
