import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SignInService } from './../services/signIn/sign-in.service';
import { User } from './../models/user/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  dateOfDay: Date = new Date();

  constructor(private formBuilder: FormBuilder,
    private signInService: SignInService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9._-]+)@([a-zA-Z]*)[.{1}]([a-z]*)$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
    })
  }

  createAccount() {
    const formValue = this.signInForm.value;
    const user = new User();
    user.lastName = formValue['lastName'];
    user.firstName = formValue['firstName'];
    user.mail = formValue['mail'];
    user.password = formValue['password'];
    user.birthday = new Date(formValue['birthday']);
    user.gender = formValue['gender'];

    this.signInService.createAccount(user);
  }

}
