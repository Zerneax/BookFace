import { Component, OnInit, Input} from '@angular/core';
import { Post } from '../models/post/post';
import { PostService } from '../services/post/post.service';
import { AuthService } from '../services/auth/auth.service';
import { ErrorService } from '../services/error/error.service';
import { ErrorMessage } from '../models/error/error';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Input() canDelete: boolean;


  constructor(private postService: PostService,
    private authService: AuthService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
  }

  like() {
    const author = this.authService.getCompleteNameOfCurrentUser();
    this.postService.like(this.post.id, author)
    .subscribe(
      (reponse) => {
        this.post = reponse;
      }, (error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.header = "Oops an error was occured";
        errorMessage.information = "Please retry later !";
        this.errorService.displayErrorMessage(errorMessage);
      }
    );
  }

  delete() {
    this.postService.delete(this.post);
  }

  disabledLike() {
    const author = this.authService.getCompleteNameOfCurrentUser();
    let result = this.post.like.includes(author, 0);

    if(result == true)
      return true;

    return false;
  }
}
