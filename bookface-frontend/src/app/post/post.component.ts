import { Component, OnInit, Input} from '@angular/core';
import { Post } from '../models/post/post';
import { PostService } from '../services/post/post.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;


  constructor(private postService: PostService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  like() {
    const author = this.authService.getCompleteNameOfCurrentUser();
    this.postService.like(this.post.id, author)
    .subscribe(
      (reponse) => {
        this.post = reponse;
      }, (error) => {
        console.log("error : " + error);
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
