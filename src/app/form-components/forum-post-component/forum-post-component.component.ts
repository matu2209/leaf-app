import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TimerService } from '../../services/timer-service/timer.service';
import { UserService } from '../../services/user-service/user.service';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service';
import { ForumService } from '../../services/forumService/forum.service';
import { Post } from '../../../../servidorConJWT/post';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
declare var bootstrap: any; 
@Component({
  selector: 'app-forum-post-component',
  templateUrl: './forum-post-component.component.html',
  styleUrl: './forum-post-component.component.scss'
})
export class ForumPostComponentComponent {
  postForm: FormGroup;
  isAdmin: Boolean = false;

  categories: string[] = ['discussion', 'research', 'suggestion', 'bug', 'question'];
  constructor(private fb: FormBuilder, private http: HttpClient, private forumService: ForumService, private AuthenticationService: AuthenticationService, private router: Router, public timerService: TimerService,
    private UserService: UserService, private toast: ToastNotificationService ) {
    this.postForm = this.fb.group({
      category: ['', Validators.required],
      postContent: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.isAdmin = this.AuthenticationService.isAdmin();
  }
  ngOnInit(): void {
  }

  post(): void {
    if(this.AuthenticationService.isMember()){
      if (this.postForm.invalid) {
        alert('Please fill in all fields.');
        return;
      }

    let newPost: Post = new Post();
    newPost.category = this.postForm.value.category;
    newPost.post = this.postForm.value.postContent;
    newPost.username = this.AuthenticationService.loggedInUserName;
    
      this.forumService.post(newPost)
        .then(response => {
      
          const modalElement = document.getElementById('forumPostModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();

          this.toast.showToast('Your post has been submitted successfully!');
          this.postForm.reset();

        })
        .catch(error => {
          console.error('Error:', error);
        })
    }
  }
}

