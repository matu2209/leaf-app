import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedInUser: any = null;

  constructor() { }
  login(user: any) {
    this.loggedInUser = user;
  }
  getLoggedUser() {
    return this.loggedInUser;
  }
  logout() {
    this.loggedInUser = null;
  }
  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }
}