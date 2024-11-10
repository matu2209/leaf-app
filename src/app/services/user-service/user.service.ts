import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../../../servidorConJWT/cliente';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:3001/usuarios';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API_URL);
  }

  deleteClient(clientId: number): Observable<any>{
    return this.http.delete(`${this.API_URL}/${clientId}`);
  }
}
