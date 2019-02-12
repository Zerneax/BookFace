import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SuiModule } from 'ng2-semantic-ui';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { HeaderMenuComponent } from '../pages/header-menu/header-menu.component';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from '../post/post.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProfileComponent } from '../profile/profile.component';
import { ErrorComponent } from './../pages/error/error.component';
import { InvitationComponent } from './../invitation/invitation.component';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user/user';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        SuiModule
      ],
      declarations: [
        SignInComponent,
        HeaderMenuComponent,
        HomeComponent,
        PostComponent,
        LoginComponent,
        NotFoundComponent,
        ProfileComponent,
        PeopleComponent,
        ErrorComponent,
        InvitationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;

    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getCurrentUser').and.returnValue(new User());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
