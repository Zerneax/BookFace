import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';

import { AppRoutingModule } from '../app-routing.module';
import { HeaderMenuComponent } from '../pages/header-menu/header-menu.component';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from '../post/post.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProfileComponent } from './profile.component';
import { PeopleComponent } from './../people/people.component';
import { ErrorComponent } from './../pages/error/error.component';
import { InvitationComponent } from './../invitation/invitation.component';

import { Post } from '../models/post/post';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppRoutingModule,
        SuiModule,
        AngularFontAwesomeModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        HomeComponent,
        HeaderMenuComponent,
        SignInComponent,
        LoginComponent,
        NotFoundComponent,
        ProfileComponent,
        PostComponent,
        PeopleComponent,
        ErrorComponent,
        InvitationComponent
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
