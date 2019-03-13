import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user/user';
import { SignInModule } from '../sign-in/sign-in.module';
import { HeaderMenuModule } from '../header-menu/header-menu.module';
import { HomeModule } from '../home/home.module';
import { LoginModule } from '../login/login.module';
import { ProfileModule } from '../profile/profile.module';
import { ErrorModule } from '../error/error.module';
import { PostModule } from '../post/post.module';
import { PeopleService } from 'src/app/services/people/people.service';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post/post';
import { of, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error/error.service';
import { Friendship } from 'src/app/models/friendship/friendship';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let peopleService: PeopleService;
  let authService: AuthService;
  let router;
  let postService: PostService;
  let errorService: ErrorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        SuiModule,
        SignInModule,
        HeaderMenuModule,
        HomeModule,
        LoginModule,
        ProfileModule,
        ErrorModule,
        PostModule,
      ],
      declarations: [
        NotFoundComponent,
        PeopleComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getCurrentUser').and.returnValue(new User());

    peopleService = fixture.debugElement.injector.get(PeopleService);
    spyOn(peopleService, 'currentPeople').and.returnValue(new User());

    router = TestBed.get(Router);
    postService = TestBed.get(PostService);

    errorService = TestBed.get(ErrorService);
    spyOn(errorService, 'displayErrorMessage').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test peopleSubject', () => {

    spyOn(component, 'loadPosts').and.callFake(() => {});
    spyOn(component, 'getFriendship').and.callFake(() => {});

    let user: User = new User();
    user.lastName = "test";
    user.firstName = "test";
    user.id = "1";
    user.mail = "test@test.com";
    user.password = "password";
    user.birthday = new Date("10/10/1980");
    user.dateRegister = "10/10/1980";

    peopleService.peopleSubject.next(user);
    expect(component.currentPeople).toEqual(user);
    expect(component.loadPosts).toHaveBeenCalled();
    expect(component.getFriendship).toHaveBeenCalled();
  });

  it('should test goHome', () => {
    spyOn(router, 'navigate').and.callThrough();

    component.goHome();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should test loadPosts OK', () => {
    let post: Post = new Post();
    post.author = "test";
    post.content = "content";
    post.date = "10/10/1980";
    post.id = "1";
    post.like = [];

    let array: Array<Post> = new Array();
    array.push(post);

    spyOn(postService, 'getPosts').and.callFake(() => {return of(array);});

    component.loadPosts();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(array);
  });

  it('should test loadPosts KO', () => {
    spyOn(postService, 'getPosts').and.callFake(() => {return throwError('erreur');});

    component.loadPosts();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

  it('should test getFriendship OK', () => {
    let friendship: Friendship = new Friendship();
    friendship.id = "1";
    friendship.idUser1 = "user 1";
    friendship.idUser2 = "user 2";
    friendship.status = "friends";

    spyOn(peopleService, 'getFriendship').and.callFake(() => {return of({friendship: friendship});});

    component.getFriendship();
    expect(peopleService.getFriendship).toHaveBeenCalled();
    expect(component.canAdd).toBeFalsy();
    expect(component.friendship).toEqual(friendship);
  });

  it('should test getFriendship KO', () => {
    spyOn(peopleService, 'getFriendship').and.callFake(() => {return throwError('erreur');});

    component.getFriendship();
    expect(peopleService.getFriendship).toHaveBeenCalled();
    expect(component.canAdd).toBeTruthy();
  });

  it('should test askToBefriends OK', () => {
    let friendship: Friendship = new Friendship();
    friendship.id = "1";
    friendship.idUser1 = "user 1";
    friendship.idUser2 = "user 2";
    friendship.status = "friends";

    spyOn(peopleService, 'askToBefriends').and.callFake(() => {return of({});});

    component.askToBefriends();
    expect(peopleService.askToBefriends).toHaveBeenCalled();
  });

  it('should test askToBefriends KO', () => {
    spyOn(peopleService, 'askToBefriends').and.callFake(() => {return throwError('erreur');});

    component.askToBefriends();
    expect(peopleService.askToBefriends).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

  it('should test removeFriends OK', () => {
    let friendship: Friendship = new Friendship();
    friendship.id = "1";
    friendship.idUser1 = "user 1";
    friendship.idUser2 = "user 2";
    friendship.status = "friends";

    component.friendship = new Friendship();
    component.friendship.id = "1";

    spyOn(peopleService, 'refuseFriendship').and.callFake(() => {return of({});});
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'goHome').and.callThrough();

    component.removeFriends();
    expect(peopleService.refuseFriendship).toHaveBeenCalled();
    expect(component.goHome).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should test removeFriends KO', () => {
    spyOn(peopleService, 'refuseFriendship').and.callFake(() => {return throwError('erreur');});

    component.friendship = new Friendship();
    component.friendship.id = "1";

    component.removeFriends();
    expect(peopleService.refuseFriendship).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });
});
