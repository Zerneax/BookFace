import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationComponent } from './invitation.component';

@NgModule({
  declarations: [
    InvitationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InvitationComponent
  ]
  // bootstrap: [InvitationComponent],
})
export class InvitationModule { }
