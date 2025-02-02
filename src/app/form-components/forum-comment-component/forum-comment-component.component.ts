import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service';
import { Comment } from '../../../../servidorConJWT/comment';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { ForumService } from '../../services/forumService/forum.service';
declare var bootstrap: any; 

@Component({
  selector: 'app-forum-comment-component',
  templateUrl: './forum-comment-component.component.html',
  styleUrls: ['./forum-comment-component.component.scss']
})
export class ForumCommentComponentComponent {
  commentForm: FormGroup;

  constructor(private fb: FormBuilder, private toast: ToastNotificationService, private AuthenticationService: AuthenticationService,
    private forumService: ForumService) {
    this.commentForm = this.fb.group({
      commentContent: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  submitComment(): void {
    if(this.AuthenticationService.isMember()){
      if (this.commentForm.invalid) {
        alert('Please write a comment.');
        return;
      }

    let newComment: Comment = new Comment();
    newComment.comment = this.commentForm.value.commentContent;
    newComment.username = this.AuthenticationService.loggedInUserName;
    
      this.forumService.commentPost(newComment)
        .then(response => {
      
          const modalElement = document.getElementById('commentModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();

          this.toast.showToast('Your comment has been submitted successfully!');
          this.commentForm.reset();

        })
        .catch(error => {
          console.error('Error:', error);
        })
    }
  }  
}