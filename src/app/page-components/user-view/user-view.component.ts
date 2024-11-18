import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../../servidorConJWT/cliente';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service';
import { elementAt } from 'rxjs';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {
  client: Client = new Client();
  constructor(private userService: UserService, private route: ActivatedRoute, private toast:ToastNotificationService) {};
  
  ngOnInit():void{
    let userId =Number (this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(userId)
    .then(response=>{
      this.client = response;
    })
    .catch(error=>alert(error));
  }

  changeState(){
    this.userService.changeState(this.client.id)
    .then(response=>{
      this.client = response.user;
      if(!this.client.isActivated){
        this.toast.showToast("User "+this.client.username+" has been deactivated successfully!"); 
      }
      else{
        this.toast.showToast("User "+this.client.username+" has been activated successfully!");
      }
    })
    .catch(error=>{
      console.log(error);
      
      alert(error);

    });
  }

}
