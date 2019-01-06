import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';
import { SignInComponent } from 'src/app/sign-in/sign-in.component';
import { HeaderMenuComponent } from 'src/app/header-menu/header-menu.component';
import { HomeComponent } from 'src/app/home/home.component';
import { PostComponent } from 'src/app/post/post.component';
import { LoginComponent } from 'src/app/login/login.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { ProfileComponent } from 'src/app/profile/profile.component';

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
      ProfileComponent
    ]}));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
