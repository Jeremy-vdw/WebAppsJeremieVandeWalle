import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {
  }

  /* transform username to number so we can use randomuser.me images as profile pictures */
  get usernumber(): string {
        let number = 0;
        for (let i = 0; i < 3; i++) {
            number += this.comment.user.username.charCodeAt(i) - 97;
        }
        return '33';
  }
}
