import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';

import { AppRoutingModule } from '../../app-routing.module';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from '../post/post.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProfileComponent } from './profile.component';
import { PeopleComponent } from './../people/people.component';
import { ErrorComponent } from './../error/error.component';
import { InvitationComponent } from './../invitation/invitation.component';

import { Post } from '../../models/post/post';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { HomeModule } from '../home/home.module';
import { HeaderMenuModule } from '../header-menu/header-menu.module';
import { SignInModule } from '../sign-in/sign-in.module';
import { LoginModule } from '../login/login.module';
import { PeopleModule } from '../people/people.module';
import { ErrorModule } from '../error/error.module';
import { APP_BASE_HREF } from '@angular/common';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { ErrorService } from 'src/app/services/error/error.service';
import { Router } from '@angular/router';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: ProfileService;
  let errorService: ErrorService;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppRoutingModule,
        SuiModule,
        AngularFontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        HomeModule,
        HeaderMenuModule,
        SignInModule,
        LoginModule,
        PeopleModule,
        ErrorModule,
      ],
      declarations: [
        NotFoundComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    const authService = fixture.debugElement.injector.get(AuthService);
    const currentUser = {id: '1234', birthday:'10/10/1980'};
    spyOn(authService, 'getCurrentUser').and.returnValue(currentUser);

    profileService = TestBed.get(ProfileService);
    errorService = TestBed.get(ErrorService);

    router = TestBed.get(Router);
    spyOn(router, 'navigate').and.callThrough();

    errorService = fixture.debugElement.injector.get(ErrorService);
    spyOn(errorService, 'displayErrorMessage').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test updateUser ok', () => {
    spyOn(profileService, 'updateUser').and.callFake(() => {return of({});});

    component.currentUser = new User();
    component.save();
    expect(profileService.updateUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should test updateUser ko', () => {
    spyOn(profileService, 'updateUser').and.callFake(() => {return throwError({});});

    component.currentUser = new User();
    component.save();
    expect(profileService.updateUser).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

  it('should test goHome', () => {
    component.goHome();
    expect(router.navigate).toHaveBeenCalled();
  });
});
