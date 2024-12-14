import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { TimerService } from '../../services/timer-service/timer.service';
import { UserService } from '../../services/user-service/user.service';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service';
declare var bootstrap: any;  // Declara bootstrap para usar sus métodos
@Component({
  selector: 'app-forum-post-component',
  templateUrl: './forum-post-component.component.html',
  styleUrl: './forum-post-component.component.scss'
})
export class ForumPostComponentComponent {
  postForm: FormGroup;
  categories: string[] = ['anuncio', 'sugerencia', 'discusiones', 'galeria', 'investigacion'];
  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthenticationService, private router: Router, public timerService: TimerService,
    private UserService: UserService, private toast: ToastNotificationService ) {
    this.postForm = this.fb.group({
      categoria: ['', Validators.required],
      postContent: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }
post(): void {
  if (this.postForm.invalid) {
    alert('Please fill in all fields.');
    return;
  }
  //Mandar el post al backend
  this.toast.showToast('Your post has been submitted successfully!');
  this.postForm.reset();
}
}
