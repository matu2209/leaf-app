import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { CustomValidators } from '../../customValidators/passwordValidator';
import { DistributionsService } from '../../services/distribution-service/distributions.service';

declare var bootstrap: any;  // Declara bootstrap para usar sus métodos


@Component({
  selector: 'app-from-register',
  templateUrl: './from-register.component.html',
  styleUrls: ['./from-register.component.scss']
})
export class FromRegisterComponent {
  registerForm: FormGroup;
  distributions: String [] = [];


  constructor(private fb: FormBuilder, private http: HttpClient, private AuthenticationService: AuthenticationService, private DistributionsService: DistributionsService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      birthDate: ['', Validators.required],
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

    this.DistributionsService.getDistribution()
      .subscribe((data: string[]) => {
        this.distributions = data;
        console.log(this.distributions);
      });
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
      birthDate: this.registerForm.value.birthDate,
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
          username: newUser.username,
          password: newUser.password
        };

        this.http.post<any[]>(url, body).subscribe(
          users => {
            if (users) {          
              this.AuthenticationService.login(users);
              alert('Login successful');

              const modalElement = document.getElementById('RegisterModal');
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