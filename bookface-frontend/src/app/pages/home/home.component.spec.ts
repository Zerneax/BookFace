import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './../../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {HomeComponent} from './home.component';
import {NotFoundComponent} from './../not-found/not-found.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { AuthService } from './../../services/auth/auth.service';
import { PostModule } from '../post/post.module';
import { InvitationModule } from '../invitation/invitation.module';
import { PeopleModule } from '../people/people.module';
import { SignInModule } from '../sign-in/sign-in.module';
import { ProfileModule } from '../profile/profile.module';
import { ErrorModule } from '../error/error.module';
import { LoginModule } from '../login/login.module';
import { HeaderMenuModule } from '../header-menu/header-menu.module';

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
        FormsModule,
        PostModule,
        InvitationModule,
        PeopleModule,
        SignInModule,
        ProfileModule,
        ErrorModule,
        LoginModule,
        HeaderMenuModule
      ],
      declarations: [
        HomeComponent,
        NotFoundComponent
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
