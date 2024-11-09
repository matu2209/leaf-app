import { Component, HostListener, OnInit } from '@angular/core';
import { PlantsService } from '../plants/plants.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Client } from '../../../servidorConJWT/cliente';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private AuthenticationService: AuthenticationService){}

  user?: Client;

  ngOnInit(){
    this.AuthenticationService.loggedInUser$.subscribe(user => {
      this.user = user;
    });
  }

}
