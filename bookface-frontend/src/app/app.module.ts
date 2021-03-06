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
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
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
import { InvitationModule } from './pages/invitation/invitation.module';
import { PostModule } from './pages/post/post.module';
import { PeopleModule } from './pages/people/people.module';
import { HomeModule } from './pages/home/home.module';
import { ErrorModule } from './pages/error/error.module';
import { HeaderMenuModule } from './pages/header-menu/header-menu.module';
import { LoginModule } from './pages/login/login.module';
import { ProfileModule } from './pages/profile/profile.module';
import { SignInModule } from './pages/sign-in/sign-in.module';
import { ProfileService } from './services/profile/profile.service';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    PeopleModule,
    HomeModule,
    ErrorModule,
    HeaderMenuModule,
    LoginModule,
    SignInModule
  ],
  providers: [
    AuthService,
    SignInService,
    LoginService,
    AuthGuardService,
    PostService,
    PeopleService,
    ErrorService,
    InvitationService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
