import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
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
import { APP_BASE_HREF } from '@angular/common';
import { PostService } from 'src/app/services/post/post.service';
import { of, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error/error.service';
import { HttpClientModule } from '@angular/common/http';
import { Post } from 'src/app/models/post/post';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { Friendship } from 'src/app/models/friendship/friendship';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people/people.service';
import { Friend } from 'src/app/models/friend/friend';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let errorService;
  let postService: PostService;
  let invitationService: InvitationService;
  let router: Router;
  let peopleService: PeopleService;

  const postServiceStub = {
    createPost(post:Post) {
      return of({data:"1"});
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
        HeaderMenuModule,
        HttpClientModule
      ],
      declarations: [
        HomeComponent,
        NotFoundComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        PostService,
        InvitationService
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

    errorService = fixture.debugElement.injector.get(ErrorService);
    spyOn(errorService, 'displayErrorMessage').and.callThrough();

    postService = TestBed.get(PostService);
    postService.initPosts(new Array());
    router = TestBed.get(Router);
    invitationService = TestBed.get(InvitationService);
    peopleService = TestBed.get(PeopleService);

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should test getPosts', () => {
    spyOn(postService, 'getPosts').and.returnValue(of({}));
    spyOn(postService, 'initPosts').and.callFake(() => {return 'ok';});

    component.getPosts();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(postService.initPosts).toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
  });

  it('should test getPosts KO', () => {
    spyOn(postService, 'getPosts').and.returnValue(throwError('erreur'));

    component.getPosts();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });


  it('should test addPost OK', () => {
    spyOn(postService, 'createPost').and.callFake(() => { return of({headers: {get: location => 'test'}});});
    spyOn(postService, 'getPost').and.callFake(() => {return of('test')});
    spyOn(postService, 'addingPostToArray').and.callThrough();

    component.addPost();

    expect(postService.createPost).toHaveBeenCalled();
    expect(postService.getPost).toHaveBeenCalled();
    expect(postService.addingPostToArray).toHaveBeenCalled();
    expect(component.content).toEqual("");
  });

  it('should test addPost KO', () => {
    spyOn(postService, 'createPost').and.callFake(() => {return throwError('erreur');});

    component.addPost();
    expect(postService.createPost).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

  it('should test displayProfile', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.displayProfile();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should test waitingFriendshipSubject', () => {
    let test: Array<Friendship> = new Array();
    let f = new Friendship();
    f.id = "test";
    f.idUser1 = "test";
    f.idUser2 = "test";
    f.status = "test";
    test.push(f);
    invitationService.waitingFriendshipSubject.next(test);
    expect(component.waitingFriendshipList).not.toEqual(undefined);
    expect(component.waitingFriendship).toEqual(1);
  });

  it('should test getAllFriends OK', () => {
    let friend = new Friend();
    friend.firstName = "test";
    friend.lastName = "test";
    friend.idFriendship = "123456";
    friend.since = "10/10/1980";
    let friends: Array<Friend> = new Array();
    friends.push(friend);

    spyOn(peopleService, 'getAllFriends').and.callFake(() => {return of(friends);});

    component.getAllFriends();
    expect(peopleService.getAllFriends).toHaveBeenCalled();
    expect(component.friends.length).toEqual(1);
  });

  it('should test getAllFriends KO', () => {
    spyOn(peopleService, 'getAllFriends').and.callFake(() => {return throwError('erreur');});

    component.getAllFriends();
    expect(peopleService.getAllFriends).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

  it('should test removeFriendship OK', () => {
    let friend = new Friend();
    friend.firstName = "test";
    friend.lastName = "test";
    friend.idFriendship = "654321";
    friend.since = "10/10/1980";
    component.friends.push(friend);

    spyOn(peopleService, 'refuseFriendship').and.callFake(() => {return of({});});

    component.removeFriendship('654321');
    expect(peopleService.refuseFriendship).toHaveBeenCalled();
    expect(component.friends.length).toEqual(0);
  });

  it('should test removeFriendship OK', () => {
    spyOn(peopleService, 'refuseFriendship').and.callFake(() => {return throwError('erreur');});

    component.removeFriendship('654321');
    expect(peopleService.refuseFriendship).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

});
