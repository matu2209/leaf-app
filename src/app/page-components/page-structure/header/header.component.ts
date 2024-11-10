import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication-service/authentication.service';
import { Client } from '../../../../../servidorConJWT/cliente';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private AuthenticationService: AuthenticationService){}

  user?: Client;

  ngOnInit(){
    this.AuthenticationService.loggedInUser$.subscribe(user => {
      this.user = user;
    });
  }

  logOut(){
    this.AuthenticationService.logout();
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
