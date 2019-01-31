import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignInService } from './../services/signIn/sign-in.service';
import { AuthService } from './../services/auth/auth.service';
import { ShaService } from './../services/sha/sha.service';
import { User } from './../models/user/user';
import { ErrorMessage } from './../models/error/error';

import * as moment from 'moment';
import { ErrorService } from '../services/error/error.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  dateOfDay: Date = new Date();

  constructor(private formBuilder: FormBuilder,
    private signInService: SignInService,
    private authService: AuthService,
    private shaService: ShaService,
    private errorService: ErrorService,
    private router: Router) { }

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
    if(control.value != undefined && control.value != "") {
      let dateSelected = moment(control.value);
      if(dateSelected.isAfter(moment().subtract(13, 'years'))) {
        return {
          'isUnder13' : true
        }
      }
    }

    return null;
  }

  checkMailAlreadyUsed() {
    if(this.signInForm.controls['mail'].errors == null) {
      this.signInService.checkMailAlreadyUsed(this.signInForm.value['mail'])
      .subscribe(
        (retour) => {
          if(retour != null && !retour.available) {
            const errorMessage = new ErrorMessage();
            errorMessage.header = "Oops an error has occured !";
            errorMessage.information = "This mail is already used. Please choose an another one !";
            this.errorService.displayErrorMessage(errorMessage);
          }
        },
        (error) => {
          const errorMessage = new ErrorMessage();
          errorMessage.header = "Oops an error has occured !";
          errorMessage.information = "We can't check the validity of your mail. Retry later please !";
          this.errorService.displayErrorMessage(errorMessage);
        }
      );
    }
  }

  createAccount() {
    const formValue = this.signInForm.value;
    const user = new User();
    user.lastName = formValue['lastName'];
    user.firstName = formValue['firstName'];
    user.mail = formValue['mail'];
    user.password = this.shaService.getSha(formValue['password']);
    console.log("formValue['birthday'] : " + formValue['birthday']);
    let parseDate = formValue['birthday'].toLocaleDateString();
    user.birthday = moment(parseDate, "DD/MM/YYYY" ).toDate();
    user.gender = formValue['gender'];

    this.signInService.createAccount(user)
    .subscribe(
      (response) => {
        this.authService.getUserAfterCreate(response.headers.get('Location'))
        .subscribe(
          (response) => {
            this.authService.authenticationSuccess(response.user);
            this.router.navigate(['home']);

          }, (error) => {
            const errorMessage = new ErrorMessage();
            errorMessage.header = "Oops an error has occured !";
            errorMessage.information = "Please try to login !";
            this.errorService.displayErrorMessage(errorMessage);
            this.router.navigate(['login']);
          }
        );
      },
      (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error has occured !";
        errorMessage.information = "We can't create your account for now. Retry later please !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );
  }

}
