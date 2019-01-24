import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';

import { AppRoutingModule } from '../app-routing.module';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from './post.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProfileComponent } from '../profile/profile.component';
import { PeopleComponent } from './../people/people.component';

import { Post } from '../models/post/post';

import { AuthService } from './../services/auth/auth.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

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
        PostComponent,
        PeopleComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    const post: Post = new Post();
    post.like = [];
    component.post = post;

    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getCompleteNameOfCurrentUser').and.returnValue("test test");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
