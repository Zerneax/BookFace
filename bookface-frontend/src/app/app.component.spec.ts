import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { HomeModule } from './pages/home/home.module';
import { HeaderMenuModule } from './pages/header-menu/header-menu.module';
import { SignInModule } from './pages/sign-in/sign-in.module';
import { PeopleModule } from './pages/people/people.module';
import { LoginModule } from './pages/login/login.module';
import { ProfileModule } from './pages/profile/profile.module';
import { ErrorModule } from './pages/error/error.module';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SuiModule,
        AngularFontAwesomeModule,
        HomeModule,
        HeaderMenuModule,
        SignInModule,
        PeopleModule,
        LoginModule,
        ProfileModule,
        ErrorModule
      ],
      declarations: [
        AppComponent,
        NotFoundComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bookface-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('bookface-frontend');
  });

});
