import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { Client } from '../../../../../servidorConJWT/cliente';
import { ToastNotificationService } from '../../../services/toast-service/toast-notification.service';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent implements OnInit{

  clients: Client[] = [];

  constructor(private userService: UserService, private toast: ToastNotificationService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers():void {
    this.userService.getAllClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      
    },
    (error) => {
      console.error(error);
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteClient(id).subscribe(() => {
      this.loadUsers();
    },
    (error) => {
      console.error(error);
    });
  }
}
