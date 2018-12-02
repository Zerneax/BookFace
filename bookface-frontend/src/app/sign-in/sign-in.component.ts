import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SignInService } from './../services/signIn/sign-in.service';
import { User } from './../models/user/user';

import * as moment from 'moment';

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
      birthday: ['', [Validators.required, this.checkBirthday]],
      gender: ['', Validators.required],
    })
  }

  checkBirthday(control: FormControl) {
    if(control.value != "") {
      let dateSelected = moment(control.value);
      if(dateSelected.isAfter(moment().subtract(13, 'years'))) {
        return {
          'isUnder13' : true
        }
      }
    }
    return {
      'isUnder13' : false
    }
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
