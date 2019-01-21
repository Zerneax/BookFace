import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login/login.service';
import { AuthService } from './../services/auth/auth.service';
import { User } from './../models/user/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeopleService } from '../services/people/people.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  loginForm: FormGroup;
  auth: boolean;
  authSubscription: Subscription;
  user: User;
  userSubscription: Subscription;

  peoples: Array<any> = new Array();
  delay: number = 0;


  content: string[] = [
    "Apple", "Bird", "Car", "Dog",
       "Elephant", "Finch", "Gate", "Horrify",
       "Indigo", "Jelly", "Keep", "Lemur",
       "Manifest", "None", "Orange", "Peel",
       "Quest", "Resist", "Suspend", "Terrify",
       "Underneath", "Violet", "Water", "Xylophone",
"Yellow", "Zebra"
    // etc
  ];

  constructor(private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private peopleService: PeopleService) { }

  ngOnInit() {
    this.initForm();
    this.authSubscription = this.authService.authSubject.subscribe(
      (auth: boolean) => {this.auth = auth;}
    );

    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {this.user = user;}
    );

    this.peopleService.getPeople().subscribe(
      (responsePeople) => {
        console.log("ici");
        responsePeople.forEach(u => {
          this.peoples.push({'title': u.lastName + " " + u.firstName, 'id': u.id});
        })

        console.log("length : " + this.peoples.length);
      }, (error) => {
        console.log("Error " + error);
      }
    );

  }


  // public optionsSearch = async (query:any) => {
  //   console.log("++" + this.peoples);
  // }

  // public optionsSearch(query:string,  event: any) {
  //
  //     return new Promise<Array<any>>(resolve => {
  //             const options = this.peoples;
  //             console.log("++");
  //         // const results = options
  //         //     .filter(o => o.title.slice(0, query.length).toLowerCase() === query.toLowerCase());
  //         setTimeout(() => resolve([{title: 'salut'}]), 100);
  //     });
  // }

  // optionsSearch(query:string) {
  //   this.test();
  //   const options = this.peoples;
  //
  //   return new Promise<Array<any>>(resolve => {
  //       const results = options
  //           .filter(o => o.title.slice(0, query.length).toLowerCase() === query.toLowerCase());
  //       setTimeout(() => resolve(results), 300);
  //   });
  // }

  public get options():Array<any> {
    return this.peoples;
  }


  initForm() {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.loginService.login(this.loginForm.value['mail'])
    .subscribe(
      (response) => {
        if(this.loginService.checkPassword(this.loginForm.value['password'], response.password)) {
          this.authService.getUser(response.id).subscribe(
            (responseUser) => {
              this.authService.authenticationSuccess(responseUser.user);
              this.router.navigate(['home']);
            }, (error) => {
              this.router.navigate(['login']);
            }
          );
        }else {
          this.router.navigate(['login']);
        }
      }, () => {
        this.router.navigate(['login']);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
