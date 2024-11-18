import { Component, Input } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-toast-notifications',
  templateUrl: './toast-notifications.component.html',
  styleUrl: './toast-notifications.component.scss'
})
export class ToastNotificationsComponent {
  @Input() notificationMessage: string = '';
}
