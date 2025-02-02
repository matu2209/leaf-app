import { Component, OnInit } from '@angular/core';
import { TimerService } from './services/timer-service/timer.service';
declare var bootstrap: any; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LabIVPlant_1';
  constructor(private timerService: TimerService) {}

  ngOnInit() {

    this.timerService.startTimer(80000);
    // this.timerService.startTimer(3000);

    this.timerService.timerEndObservable.subscribe(() => {
      const logInModal = document.getElementById('logInModal');
      const registerModal = document.getElementById('RegisterModal');
      
      if (logInModal) {
        const logInModalInstance = bootstrap.Modal.getInstance(logInModal);
        if (logInModalInstance) logInModalInstance.hide();
      }

      if (registerModal) {
        const registerModalInstance = bootstrap.Modal.getInstance(registerModal);
        if (registerModalInstance) registerModalInstance.hide();
      }

      const timerAlertModal = document.getElementById('TimerAlertModal');
      if (timerAlertModal) {
        const bootstrapModal = new bootstrap.Modal(timerAlertModal);
        bootstrapModal.show();
      }
    });
  }
}
