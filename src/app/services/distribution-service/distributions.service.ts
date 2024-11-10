import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class DistributionsService {

  
  constructor(private http: HttpClient) { }

  // Método para obtener la lista de países desde el archivo JSON
  getDistribution(): Observable<string[]> {
    return this.http.get<string[]>('/distributions/distributionsL4.json');
  }

}
