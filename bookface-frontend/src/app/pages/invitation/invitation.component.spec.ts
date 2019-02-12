import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationComponent } from './invitation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { SuiModule } from 'ng2-semantic-ui';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeComponent } from '../home/home.component';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { LoginComponent } from '../../login/login.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { ProfileComponent } from '../../profile/profile.component';
import { PostComponent } from '../../post/post.component';
import { PeopleComponent } from '../../people/people.component';
import { ErrorComponent } from '../error/error.component';
import { Friendship } from '../../models/friendship/friendship';

describe('InvitationComponent', () => {
  let component: InvitationComponent;
  let fixture: ComponentFixture<InvitationComponent>;

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
        PeopleComponent,
        ErrorComponent,
        InvitationComponent
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
