import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';

import { AppRoutingModule } from '../../app-routing.module';
import { PostComponent } from './post.component';
import { NotFoundComponent } from '../not-found/not-found.component';

import { Post } from '../../models/post/post';

import { AuthService } from './../../services/auth/auth.service';
import { HomeModule } from '../home/home.module';
import { HeaderMenuModule } from '../header-menu/header-menu.module';
import { SignInModule } from '../sign-in/sign-in.module';
import { LoginModule } from '../login/login.module';
import { ProfileModule } from '../profile/profile.module';
import { PeopleModule } from '../people/people.module';
import { ErrorModule } from '../error/error.module';

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
        FormsModule,
        HomeModule,
        HeaderMenuModule,
        SignInModule,
        LoginModule,
        ProfileModule,
        PeopleModule,
        ErrorModule,

      ],
      declarations: [
        NotFoundComponent
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
