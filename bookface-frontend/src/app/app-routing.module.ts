import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignInComponent} from './pages/sign-in/sign-in.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {ProfileComponent} from './pages/profile/profile.component';

import {AuthGuardService} from './services/guard/auth-guard.service';
import { PeopleComponent } from './pages/people/people.component';

const routes: Routes = [
  { path: '', component: SignInComponent},
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent},
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent},
  { path: 'login', component: LoginComponent},
  { path: 'people', canActivate: [AuthGuardService], component: PeopleComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
