// timer.service.ts
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer: any;
  private timerEnd$ = new Subject<void>();
  isTimerExpired = false; 

  startTimer(duration: number) {
    this.isTimerExpired = false; 
    this.timer = setTimeout(() => {
      this.isTimerExpired = true; 
      this.timerEnd$.next();
    }, duration);
  }

  stopTimer() {
    clearTimeout(this.timer);
    this.isTimerExpired = false;
  }

  get timerEndObservable() {
    return this.timerEnd$.asObservable();
  }
}
