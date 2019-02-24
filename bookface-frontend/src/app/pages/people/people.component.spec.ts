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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;

    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getCurrentUser').and.returnValue(new User());

    const peopleService = fixture.debugElement.injector.get(PeopleService);
    spyOn(peopleService, 'currentPeople').and.returnValue(new User());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
