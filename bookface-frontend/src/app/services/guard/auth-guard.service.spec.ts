import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';

import { HeaderMenuComponent } from '../../header-menu/header-menu.component';
import { HomeComponent } from '../../home/home.component';
import { PostComponent } from '../../post/post.component';
import { SignInComponent } from '../../sign-in/sign-in.component';
import { LoginComponent } from '../../login/login.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { ProfileComponent } from '../../profile/profile.component';
import { PeopleComponent } from './../../people/people.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';

describe('AuthGuardService', () => {
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
      PeopleComponent
    ]
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
