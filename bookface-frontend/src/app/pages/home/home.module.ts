import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SuiModule } from 'ng2-semantic-ui';
import { PostModule } from '../post/post.module';
import { InvitationModule } from '../invitation/invitation.module';
import { FormsModule } from '@angular/forms';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SuiModule,
    PostModule,
    InvitationModule,
    ProfileModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
