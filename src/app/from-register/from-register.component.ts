import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-from-register',
  templateUrl: './from-register.component.html',
  styleUrls: ['./from-register.component.scss']
})
export class FromRegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required],
      country: ['', Validators.required]
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
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      country: this.registerForm.value.country
    };
    console.log(newUser);
    const url = ''; // RUTA JSON SERVER

    this.http.post(url, newUser).subscribe(
      response => {
        console.log('User registered successfully', response);
        alert('User registered successfully');
        this.registerForm.reset();
      },
      error => {
        console.error('Error registering user', error);
        alert('Error registering user');
      }
    );
  }
}