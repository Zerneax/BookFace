import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './../../app-routing.module';


import { HeaderMenuComponent } from './header-menu.component';
import { SignInComponent } from './../sign-in/sign-in.component';
import {HomeComponent} from './../home/home.component';
import {LoginComponent} from './../login/login.component';
import {NotFoundComponent} from './../../not-found/not-found.component';
import {ProfileComponent} from './../../profile/profile.component';
import { PostComponent } from './../post/post.component';
import { PeopleComponent } from './../people/people.component';
import { ErrorComponent } from './../error/error.component';
import { InvitationComponent } from './../invitation/invitation.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SuiModule,
        AngularFontAwesomeModule
      ],
      declarations: [
        HeaderMenuComponent,
        SignInComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        ProfileComponent,
        PostComponent,
        PeopleComponent,
        ErrorComponent,
        InvitationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
