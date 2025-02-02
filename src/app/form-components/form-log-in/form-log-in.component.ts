import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { TimerService } from '../../services/timer-service/timer.service';
import { UserService } from '../../services/user-service/user.service';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

declare var bootstrap: any;  // Declara bootstrap para usar sus métodos


@Component({
  selector: 'app-form-log-in',
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.scss']
})
export class FormLogInComponent implements OnInit{
  externalCondition: boolean = false;
  loginForm: FormGroup;
  modalInstance: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthenticationService, private router: Router, public timerService: TimerService,
    private UserService: UserService, private toast: ToastNotificationService ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Suscripción a cambios del estado del temporizador
    this.timerService.timerEndObservableBS.subscribe(isExpired => {
      this.externalCondition = isExpired;  
      this.updateModalBehavior(); // si hay cambios en el estado del timer se cambian los atributos relacionados al formulario
    });

    const modalElement = document.getElementById('logInModal');
    this.modalInstance = new bootstrap.Modal(modalElement);
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


  updateModalBehavior() {
    if (this.modalInstance) {
      if (this.timerService.isTimerExpired || this.externalCondition) {
        // Si el temporizador ha expirado o hay una condición externa
        this.modalInstance._config.backdrop = 'static'; // No permite cerrar el modal al hacer clic fuera
        this.modalInstance._config.keyboard = false; // No permite cerrar el modal con Esc
      } else {
        // Si el temporizador no ha expirado ni hay condición externa
        this.modalInstance._config.backdrop = true; // Permite cerrar al hacer clic fuera
        this.modalInstance._config.keyboard = true;// Permite cerrar el modal con Esc
      }
      
      // Si el modal ya está abierto, lo ocultamos y luego lo mostramos para aplicar los cambios
      if (this.modalInstance._isShown) {
        this.modalInstance.hide();
        this.modalInstance.show();
      }
    }
  }



}