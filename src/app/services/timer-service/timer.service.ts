// timer.service.ts
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer: any;
  private timerEnd$ = new Subject<void>();
  isTimerExpired = false; 

  isTimerExpiredBS = new BehaviorSubject<boolean>(false); 

  startTimer(duration: number) {
    this.isTimerExpired = false;
    this.isTimerExpiredBS.next(false);

    this.timer = setTimeout(() => {
      this.isTimerExpiredBS.next(true);
      this.isTimerExpired = true; 
      this.timerEnd$.next();
    }, duration);
  }

  stopTimer() {
    clearTimeout(this.timer);
    this.isTimerExpiredBS.next(false);
    this.isTimerExpired = false;
  }

  get timerEndObservable() {
    return this.timerEnd$.asObservable();
  }

  get timerEndObservableBS() {
    return this.isTimerExpiredBS.asObservable();
  }
}
