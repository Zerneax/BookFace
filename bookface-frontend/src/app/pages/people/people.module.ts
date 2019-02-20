import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { PostModule } from '../post/post.module';

@NgModule({
  declarations: [
    PeopleComponent
  ],
  imports: [
    CommonModule,
    PostModule
  ],
  exports: [
    PeopleComponent
  ]
})
export class PeopleModule { }
