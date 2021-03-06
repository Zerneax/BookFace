import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HeaderMenuComponent } from '../../pages/header-menu/header-menu.component';
import { HomeComponent } from '../../pages/home/home.component';
import { PostComponent } from '../../pages/post/post.component';
import { SignInComponent } from '../../pages/sign-in/sign-in.component';
import { LoginComponent } from '../../pages/login/login.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { PeopleComponent } from './../../pages/people/people.component';
import { ErrorComponent } from './../../pages/error/error.component';
import { InvitationComponent } from './../../pages/invitation/invitation.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';
import { APP_BASE_HREF } from '@angular/common';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
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
    ],
    providers: [
      { provide: APP_BASE_HREF, useValue : '/' }
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
