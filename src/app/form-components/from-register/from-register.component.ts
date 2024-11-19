import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { CustomValidators } from '../../customValidators/custom-Validators';
import { DistributionsService } from '../../services/distribution-service/distributions.service';
import { TimerService } from '../../services/timer-service/timer.service';
import { UserService } from '../../services/user-service/user.service';
import { Client } from '../../../../servidorConJWT/cliente';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service';

declare var bootstrap: any; 


@Component({
  selector: 'app-from-register',
  templateUrl: './from-register.component.html',
  styleUrls: ['./from-register.component.scss']
})
export class FromRegisterComponent {
  registerForm: FormGroup;
  distributions: String [] = [];


  constructor(private fb: FormBuilder, private http: HttpClient, private AuthenticationService: AuthenticationService, private DistributionsService: DistributionsService, public timerService: TimerService,
    private userService: UserService, private toast: ToastNotificationService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required], [CustomValidators.usernameExists(this.userService)]],
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

      let newUser: Client = new Client();

      newUser.username = this.registerForm.value.username;
      newUser.password = this.registerForm.value.password;
      newUser.member = false;
      newUser.firstName = this.registerForm.value.firstName;
      newUser.lastName = this.registerForm.value.lastName;
      newUser.birthDate = this.registerForm.value.birthDate;
      newUser.email = this.registerForm.value.email;
      newUser.country = this.registerForm.value.country;
      newUser.isActivated = true;
      newUser.admin = false;

    console.log(newUser);

    this.userService.registerUser(newUser)
    .then(response => {
        console.log('User registered successfully', response);
        this.toast.showToast("Registered successfully!");  
        this.registerForm.reset();

        const body = {
          username: newUser.username,
          password: newUser.password
        };

        this.userService.logInUser(body)
        .then(user => {
          if (user) {          
            this.AuthenticationService.login(user);
            //alert('Login successful');
            //console.log("Login successful: ", user);
            this.timerService.stopTimer();

            const modalElement = document.getElementById('RegisterModal');
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
    })
    .catch(error => {
      alert('Error registering user');
    });
  }
}