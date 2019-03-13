import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationComponent } from './invitation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NotFoundComponent } from '../not-found/not-found.component';
import { Friendship } from '../../models/friendship/friendship';
import { HomeModule } from '../home/home.module';
import { HeaderMenuModule } from '../header-menu/header-menu.module';
import { SignInModule } from '../sign-in/sign-in.module';
import { LoginModule } from '../login/login.module';
import { PeopleModule } from '../people/people.module';
import { ErrorModule } from '../error/error.module';
import { APP_BASE_HREF } from '@angular/common';
import { PeopleService } from 'src/app/services/people/people.service';
import { of, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error/error.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';

describe('InvitationComponent', () => {
  let component: InvitationComponent;
  let fixture: ComponentFixture<InvitationComponent>;
  let peopleService: PeopleService;
  let errorService: ErrorService;
  let invitationService: InvitationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppRoutingModule,
        AngularFontAwesomeModule,
        HomeModule,
        HeaderMenuModule,
        SignInModule,
        LoginModule,
        PeopleModule,
        ErrorModule
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
    fixture = TestBed.createComponent(InvitationComponent);
    component = fixture.componentInstance;

    const friendship: Friendship  = new Friendship();
    component.friendShip = friendship;

    peopleService = TestBed.get(PeopleService);
    invitationService = TestBed.get(InvitationService);

    errorService = TestBed.get(ErrorService);
    spyOn(errorService, 'displayErrorMessage').and.callThrough();

    spyOn(peopleService, 'getUserLight').and.callFake(() => {return of({lastName: 'test', firstName: 'test'})});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(peopleService.getUserLight).toHaveBeenCalled();
    expect(component.lastName).toEqual('test');
    expect(component.firstName).toEqual('test');
  });

  it('should test approveFriendship OK', () => {
    component.friendShip = new Friendship();
    component.friendShip.id = "1";

    spyOn(peopleService, 'approveFriendship').and.callFake(() => {return of({})});
    spyOn(invitationService, 'removeWaitingFriendship').and.callFake(() => {});

    component.approveFriendship();
    expect(peopleService.approveFriendship).toHaveBeenCalled();
    expect(component.show).toBeFalsy();
    expect(invitationService.removeWaitingFriendship).toHaveBeenCalled();
  });

  it('should test approveFriendship KO', () => {
    component.friendShip = new Friendship();
    component.friendShip.id = "1";

    spyOn(peopleService, 'approveFriendship').and.callFake(() => {return throwError('erreur')});

    component.approveFriendship();
    expect(peopleService.approveFriendship).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

  it('should test refuseFriendship OK', () => {
    component.friendShip = new Friendship();
    component.friendShip.id = "1";

    spyOn(peopleService, 'refuseFriendship').and.callFake(() => {return of({})});
    spyOn(invitationService, 'removeWaitingFriendship').and.callFake(() => {});

    component.refuseFriendship();
    expect(peopleService.refuseFriendship).toHaveBeenCalled();
    expect(component.show).toBeFalsy();
    expect(invitationService.removeWaitingFriendship).toHaveBeenCalled();
  });

  it('should test refuseFriendship KO', () => {
    component.friendShip = new Friendship();
    component.friendShip.id = "1";

    spyOn(peopleService, 'refuseFriendship').and.callFake(() => {return throwError('erreur')});

    component.refuseFriendship();
    expect(peopleService.refuseFriendship).toHaveBeenCalled();
    expect(errorService.displayErrorMessage).toHaveBeenCalled();
  });

  // it('should create but getUserLight ko', () => {
  //   spyOn(peopleService, 'getUserLight').and.callFake(() => {return throwError('erreur')});
  //
  //   fixture.detectChanges();
  //   expect(peopleService.getUserLight).toHaveBeenCalled();
  //   expect(errorService.displayErrorMessage).toHaveBeenCalled();
  // });
});
