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
import { APP_BASE_HREF } from '@angular/common';
import { PostService } from 'src/app/services/post/post.service';
import { of, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error/error.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: PostService;
  let authService: AuthService;
  let errorService: ErrorService;

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
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
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

    authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getCompleteNameOfCurrentUser').and.returnValue("test test");

    errorService = fixture.debugElement.injector.get(ErrorService);
    spyOn(errorService, 'displayErrorMessage').and.callThrough();

    postService = TestBed.get(PostService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test like OK', () => {
    let post: Post = new Post();
    post.author = "test";
    post.content = "content";
    post.date = "10/10/1980";
    post.id = "1";
    post.like = [];

    spyOn(postService, 'like').and.callFake(() => {return of(post);});

    component.like();

    expect(authService.getCompleteNameOfCurrentUser).toHaveBeenCalled();
    expect(postService.like).toHaveBeenCalled();
    expect(component.post).not.toBeUndefined();
  });

  it('should test like KO', () => {
    let post: Post = new Post();
    post.author = "test";
    post.content = "content";
    post.date = "10/10/1980";
    post.id = "1";
    post.like = [];

    spyOn(postService, 'like').and.callFake(() => {return throwError('erreur');});

    component.like();

    expect(authService.getCompleteNameOfCurrentUser).toHaveBeenCalled();
    expect(postService.like).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

  it('should test delete', () => {

    spyOn(postService, 'delete').and.callFake(() => {});

    component.delete();
    expect(postService.delete).toHaveBeenCalled();
  });

  it('should test disableLike true', () => {
    let array = ['test test'];
    component.post.like = array;
    let retour = component.disabledLike();
    expect(retour).toBeTruthy();
  });

  it('should test disableLike false', () => {
    component.post.like = [];
    let retour = component.disabledLike();
    expect(retour).toBeFalsy();
  });
});
