import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

declare var bootstrap: any;  // Declara bootstrap para usar sus métodos


@Component({
  selector: 'app-form-log-in',
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.scss']
})
export class FormLogInComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthenticationService, private router: Router) {
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

    const url = 'http://localhost:3001/login'; // RUTA JSON SERVER

    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post<any[]>(url, body).subscribe(
      users => {
        if (users) {          
          this.authService.login(users);
          alert('Login successful');
          this.loginForm.reset();
          //this.router.navigate(['profile']);

          const modalElement = document.getElementById('logInModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
          
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