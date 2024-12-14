import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service';

@Component({
  selector: 'app-forum-comment-component',
  templateUrl: './forum-comment-component.component.html',
  styleUrls: ['./forum-comment-component.component.scss']
})
export class ForumCommentComponentComponent {
  commentForm: FormGroup;

  constructor(private fb: FormBuilder, private toast: ToastNotificationService) {
    this.commentForm = this.fb.group({
      commentContent: ['', Validators.required]
    });
  }

  submitComment(): void {
    if (this.commentForm.invalid) {
      alert('Please write a comment.');
      return;
    }
    // Handle the comment submission logic here
    this.toast.showToast('Your comment has been submitted successfully!');
    this.commentForm.reset();
  }
}