import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { HeaderMenuComponent } from 'src/app/pages/header-menu/header-menu.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PostComponent } from 'src/app/pages/post/post.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PeopleComponent } from './../../pages/people/people.component';
import { ErrorComponent } from './../../pages/error/error.component';
import { InvitationComponent } from './../../pages/invitation/invitation.component';
import { APP_BASE_HREF } from '@angular/common';

describe('LoginService', () => {
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
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
