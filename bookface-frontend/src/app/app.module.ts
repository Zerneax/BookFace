import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderMenuComponent } from './pages/header-menu/header-menu.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { PeopleComponent } from './pages/people/people.component';
import { InvitationComponent } from './pages/invitation/invitation.component';
import { ErrorComponent } from './pages/error/error.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { AuthService } from './services/auth/auth.service';
import { SignInService } from './services/signIn/sign-in.service';
import { LoginService } from './services/login/login.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { PostService } from './services/post/post.service';
import { PeopleService } from './services/people/people.service';
import { ErrorService } from './services/error/error.service';
import { InvitationService } from './services/invitation/invitation.service';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    HeaderMenuComponent,
    LoginComponent,
    NotFoundComponent,
    PostComponent,
    ProfileComponent,
    PeopleComponent,
    InvitationComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuiModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    SignInService,
    LoginService,
    AuthGuardService,
    PostService,
    PeopleService,
    ErrorService,
    InvitationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
