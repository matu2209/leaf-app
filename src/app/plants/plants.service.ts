import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantsService{
  private backendUrl = 'http://localhost:3000';  // Cambia si es necesario

  constructor(private http: HttpClient) {}

  plants:String[] = []
  initplants: any[] = [];
  token: string | null = null

  //--------------------------------------------------------------------------------//
  getToken(): Observable<any> {
    return this.http.post(`${this.backendUrl}/get-token`, {});
  }

  //--------------------------------------------------------------------------------//
  getPlants(): Observable<any> {
    if (!this.token) {
      throw new Error('Token no disponible');
    }
    const apiUrl = `https://trefle.io/api/v1/species?token=${this.token}`;
    //const apiUrl = `https://trefle.io/api/v1/plants?token=aW2LEBeBBBOFaqdQAkfHOmJfmK_aD4Str_qpiZT2vag`;
    //const apiUrl = `https://trefle.io/api/v1/plants/search?token=${this.token}&q=coconut`;
    
    return this.http.get(apiUrl); 
  }

  getByFilters(query:String): Observable<any> {
    if (!this.token) {
      throw new Error('Token no disponible');
    }
    const apiUrl = `https://trefle.io/api/v1/plants?token=${this.token}${query}`;

    console.log(apiUrl);
    return this.http.get(apiUrl); 
  }
}
