import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-form-log-in',
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.scss']
})
export class FormLogInComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthenticationService) {
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

    const url = ''; // RUTA JSON SERVER

    this.http.get<any[]>(`${url}?username=${this.loginForm.value.username}&password=${this.loginForm.value.password}`).subscribe(
      users => {
        if (users.length > 0) {
          this.authService.login(users[0]);
          alert('Login successful');
        } else {
          alert('Invalid username or password');
        }
      },
      error => {
        console.error('Error:', error);
        alert('An error occurred while validating credentials');
      }
    );
  }
}