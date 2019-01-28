import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { AuthService } from './services/auth/auth.service';
import { SignInService } from './services/signIn/sign-in.service';
import { LoginService } from './services/login/login.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { PostService } from './services/post/post.service';
import { PeopleService } from './services/people/people.service';
import { PeopleComponent } from './people/people.component';
import { InvitationComponent } from './invitation/invitation.component';



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
    InvitationComponent
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
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
