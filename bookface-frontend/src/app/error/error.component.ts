import { Component, OnInit } from '@angular/core';
import { ErrorMessage } from '../models/error/error';
import { Subscription } from 'rxjs';
import { ErrorService } from '../services/error/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  private error: ErrorMessage = new ErrorMessage();
  private errorSubscription: Subscription;

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorSubscription = this.errorService.errorSubject.subscribe(
      (error: ErrorMessage) => {
        this.error = error;
        this.error.display = true;
        setTimeout(() => {this.error = new ErrorMessage();}, 6000);
      }
    );
  }

}
