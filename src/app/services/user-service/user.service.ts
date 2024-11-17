import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../../../servidorConJWT/cliente';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API_URL + "/usuarios");
  }

  deleteClient(clientId: number): Observable<any>{
    return this.http.delete(this.API_URL + `/usuarios/${clientId}`);
  }

  getByuserName(userName: string): Promise<any>{
    return this.http.get(this.API_URL + `/usuarios/username/${userName}`)
    .toPromise();
  }

  getUserById(clientId: number): Promise<any>{
    return this.http.get(this.API_URL + `/usuarios/${clientId}`)
    .toPromise();
  }
  
  registerUser(user: Client): Promise<any>{
    return this.http.post(this.API_URL + "/usuarios", user)
    .toPromise();
  }

  logInUser(body: any): Promise<any>{
    return this.http.post(this.API_URL + "/login", body)
    .toPromise();
  }

  changeState(id: number): Promise<any>{
    return this.http.get(this.API_URL + `/view/${id}`)
    .toPromise();
  }
}
