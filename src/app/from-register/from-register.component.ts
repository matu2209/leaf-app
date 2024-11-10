import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { CustomValidators } from '../customValidators/passwordValidator';

declare var bootstrap: any;  // Declara bootstrap para usar sus métodos


@Component({
  selector: 'app-from-register',
  templateUrl: './from-register.component.html',
  styleUrls: ['./from-register.component.scss']
})
export class FromRegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private AuthenticationService: AuthenticationService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName:['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required,],
      country: ['', Validators.required]
    },
    {
      validators: [CustomValidators.passwordMatch]
    }
  );
  }

  registerUser() {
    if (this.registerForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.passwordConfirmation) {
      alert('Passwords do not match');
      return;
    }

    const newUser = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      member: false,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      country: this.registerForm.value.country,
      admin: false,
      favorites: [],
      creditCard: []
    };
    console.log(newUser);
    const url = 'http://localhost:3001/usuarios'; 

    this.http.post(url, newUser).subscribe(
      response => {
        console.log('User registered successfully', response);
        alert('User registered successfully');
        this.registerForm.reset();
          
                              
        
        const url = 'http://localhost:3001/login'; 
        const body = {
          email: newUser.email,
          password: newUser.password
        };

        this.http.post<any[]>(url, body).subscribe(
          users => {
            if (users) {          
              this.AuthenticationService.login(users);
              alert('Login successful');

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



      },
      error => {
        console.error('Error registering user', error);
        alert('Error registering user');
      }
    );
  }
}