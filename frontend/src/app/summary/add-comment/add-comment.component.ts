import {SummaryDataService} from '../../summary/summary-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TransitionController, Transition, TransitionDirection} from 'ng2-semantic-ui';
import { Summary } from '../../models/summary.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Output() public newComment = new EventEmitter<Comment>();
  @Input() public summary: Summary;
  public transitionController = new TransitionController();
  private comment: FormGroup;
  private _newCommentpushed: Comment;

  constructor(private fb: FormBuilder, private _summaryDataService: SummaryDataService) { }

  ngOnInit() {
    this.comment = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  OnSubmit() {
    const comment = new Comment(this.comment.value.text, new Date());
    this._summaryDataService.addCommentToSummary(this.summary, comment).subscribe(item => this.newComment.emit(item));
    this.transitionController.animate(new Transition('fade down', 400, TransitionDirection.Out));
  }

}
