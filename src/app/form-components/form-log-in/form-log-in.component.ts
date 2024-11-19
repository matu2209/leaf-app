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
  selector: 'app-form-log-in',
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.scss']
})
export class FormLogInComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthenticationService, private router: Router, public timerService: TimerService,
    private UserService: UserService, private toast: ToastNotificationService ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  validateCredentials() {
    if (this.loginForm.invalid) {
      alert('Please fill in both fields.');
      return;
    }
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.UserService.logInUser(body)
      .then(user => {
        if (user) {          
          this.authService.login(user);
          //alert('Login successful');
          console.log("Login successful: ", user);
          this.toast.showToast("Login successful!");  
          this.timerService.stopTimer();
          this.loginForm.reset();

          const modalElement = document.getElementById('logInModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
          
        } else {
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while validating credentials');
      })
  }

}