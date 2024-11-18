import { Injectable } from '@angular/core';
declare var bootstrap: any;
@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  constructor() { }
  showToast(alertMessage: string){
    console.log(alertMessage);
    const toastElement = document.getElementById('liveToast');
    if(toastElement) {
    const body = toastElement.querySelector('.toast-body');
      if (body) body.textContent = alertMessage;

    bootstrap.Toast.getOrCreateInstance(toastElement).show();
  }
}
}
