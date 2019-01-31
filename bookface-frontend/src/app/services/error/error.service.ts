import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorMessage } from 'src/app/models/error/error';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements OnInit {


  errorSubject = new Subject<ErrorMessage>();
  private errorMessage: ErrorMessage;

  constructor() { }

  ngOnInit(): void {
    this.errorSubject.next(this.errorMessage);
  }

  emitErrorMessageSubject() {
    this.errorSubject.next(this.errorMessage);
  }

  displayErrorMessage(error: ErrorMessage) {
    this.errorMessage = error;
    this.emitErrorMessageSubject();
  }
}
