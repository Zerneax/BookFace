import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './../../app-routing.module';


import { HeaderMenuComponent } from './header-menu.component';
import {NotFoundComponent} from './../not-found/not-found.component';

import { SuiModule } from 'ng2-semantic-ui';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { SignInModule } from '../sign-in/sign-in.module';
import { PeopleModule } from '../people/people.module';
import { HomeModule } from '../home/home.module';
import { ErrorModule } from '../error/error.module';
import { LoginModule } from '../login/login.module';

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        SuiModule,
        AngularFontAwesomeModule,
        PeopleModule,
        HomeModule,
        ErrorModule,
        LoginModule,
        SignInModule
      ],
      declarations: [
        HeaderMenuComponent,
        NotFoundComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
