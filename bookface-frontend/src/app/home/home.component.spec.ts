import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { HeaderMenuComponent } from './../header-menu/header-menu.component';
import { SignInComponent } from './../sign-in/sign-in.component';
import {HomeComponent} from './home.component';
import {LoginComponent} from './../login/login.component';
import {NotFoundComponent} from './../not-found/not-found.component';
import {ProfileComponent} from './../profile/profile.component';
import { PostComponent } from './../post/post.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { User } from '../models/user/user';

import { AuthService } from './../services/auth/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppRoutingModule,
        SuiModule,
        AngularFontAwesomeModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        HomeComponent,
        HeaderMenuComponent,
        SignInComponent,
        LoginComponent,
        NotFoundComponent,
        ProfileComponent,
        PostComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    const authService = fixture.debugElement.injector.get(AuthService);
    const currentUser = {id: '1234'};
    spyOn(authService, 'getCurrentUser').and.returnValue(currentUser);
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
