import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../../../servidorConJWT/cliente';
import { PlantsService } from '../plants-service/plants.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedInUserSubject = new BehaviorSubject<any>(null);

  // private loggedInUser: any = null;
  // private loggedInUserToken: any = null;
  loggedInUser$ = this.loggedInUserSubject.asObservable();
  loggedInUserToken: string = "";
  loggedInUserName: string = "";


  constructor(private http: HttpClient, private plants: PlantsService) { }
  // login(user: any) {
  //   this.loggedInUser = user.usuario;
  //   this.loggedInUserToken = user.token;

  //   console.log(this.loggedInUser);
  //   console.log(this.loggedInUserToken);
  // }
  // getLoggedUser() {
  //   return this.loggedInUser;
  // }
  // logout() {
  //   this.loggedInUser = null;
  // }
  // isLoggedIn(): boolean {
  //   return this.loggedInUser !== null;
  // }

  login(user: any) {
    this.loggedInUserSubject.next(user.usuario);
    this.loggedInUserToken = user.token;
    this.loggedInUserName = user.usuario.username;

    console.log('Usuario logueado:', user.usuario);
    console.log('Token:', user.token);
  }

  logout() {
    this.loggedInUserSubject.next(null);
    this.loggedInUserToken = "";
    this.loggedInUserName = "";
    this.plants.resetPlantsPagination();
  }

  isLoggedIn(): boolean {
    return this.loggedInUserSubject.value !== null;
  }

  getUserName(): string {
    return this.loggedInUserName;
  }

  isAdmin(): boolean {
    return this.loggedInUserSubject.value?.admin;
  }

  isMember(): boolean {
    return this.loggedInUserSubject.value?.member;
  }

  updateUser(user: Client){
    //console.log(user);
    const url = `http://localhost:3001/usuarios/${user.id}`; // RUTA JSON SERVER
  
    const body = {
      ...user
    };
    return this.http.put<any[]>(url, body);
  }
}