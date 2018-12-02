import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { AuthService } from './services/auth/auth.service';
import { SignInService } from './services/signIn/sign-in.service';
import { HomeComponent } from './home/home.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuiModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    SignInService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
