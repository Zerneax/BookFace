import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { HeaderMenuComponent } from 'src/app/pages/header-menu/header-menu.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PostComponent } from 'src/app/pages/post/post.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PeopleComponent } from 'src/app/pages/people/people.component';
import { ErrorComponent } from 'src/app/pages/error/error.component';
import { InvitationComponent } from 'src/app/pages/invitation/invitation.component';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';

describe('ProfileService', () => {
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
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});
