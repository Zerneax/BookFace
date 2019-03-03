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

describe('InvitationComponent', () => {
  let component: InvitationComponent;
  let fixture: ComponentFixture<InvitationComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
