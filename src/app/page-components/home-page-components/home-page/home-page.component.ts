import { Component, HostListener, OnInit } from '@angular/core';
import { PlantsService } from '../../../services/plants-service/plants.service';
import { AuthenticationService } from '../../../services/authentication-service/authentication.service';
import { Client } from '../../../../../servidorConJWT/cliente';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private AuthenticationService: AuthenticationService){}
  isLogged: boolean = false;
  user?: Client;

  ngOnInit(){
    this.AuthenticationService.loggedInUser$.subscribe(user => {
      this.user = user;
      this.isLogged = this.AuthenticationService.isLoggedIn();
    });
  }

}
