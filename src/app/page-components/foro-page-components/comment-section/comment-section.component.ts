import { Component, Input } from '@angular/core';
import { Comment } from '../../../../../servidorConJWT/comment';
import { ForumService } from '../../../services/forumService/forum.service';
@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent {

  @Input() postId!: number;
  @Input() comment!: Comment;

  
  constructor(private forumService: ForumService){}
  openCommentModal(id: number){
    this.forumService.currentPostId = id;
  }

}
