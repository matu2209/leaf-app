import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private timer: any;
  private sessionDuration = 0.2 * 60 * 1000; // 1 minuto en milisegundos

  constructor(private authService: AuthenticationService, private router: Router) {}

  startSessionTimer() {
    if (!this.authService.isLoggedIn()) {  
      this.timer = setTimeout(() => {
        alert('Your session is limited to 1 minutes. Please register or log in.');
        this.router.navigate(['/register']); 
      }, this.sessionDuration);
    }
  }

  clearSessionTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
