import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../../servidorConJWT/cliente';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {
  client: Client = new Client();
  constructor(private userService: UserService, private route: ActivatedRoute) {};
  
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
      
      alert(response.message);
      this.client = response.user;
    })
    .catch(error=>{
      console.log(error);
      
      alert(error);

    });
  }

}
