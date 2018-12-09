import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignInComponent} from './sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: SignInComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
