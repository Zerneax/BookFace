import { Component, OnInit, Input} from '@angular/core';
import { Post } from '../models/post/post';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;


  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  like() {
    this.postService.like(this.post.id)
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
}
