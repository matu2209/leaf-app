import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantsService{
  private backendUrl = 'http://localhost:3000';  

  constructor(private http: HttpClient) {}

  plants: String[] = [];
  initplants: any[] = [];


  token: string | null = null
  lastFilter: String = "";

  actualPage: String = "";
  firstPage: String = "";
  previousPage: String = "";
  nextPage: String = "";
  endPage: String = "";

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

    
    return this.http.get(apiUrl); 
  }

  getByFilters(query:String, page:String): Observable<any> {
    if (!this.token) {
      throw new Error('Token no disponible');
    }
    const apiUrl = `https://trefle.io/api/v1/plants?token=${this.token}${query}&page=${page}`;
    this.lastFilter = `${query}`;
    
    console.log(apiUrl);
    return this.http.get(apiUrl); 
  }

  getByName(query:String): Observable<any> {
    if (!this.token) {
      throw new Error('Token no disponible');
    }
    const apiUrl = `https://trefle.io/api/v1/plants?token=${this.token}&filter[common_name]=${query}`;

    console.log(apiUrl);
    return this.http.get(apiUrl); 
  }

  getById(id:number): Observable<any> {
    if (!this.token) {
      throw new Error('Token no disponible');
    }
    console.log("el id que busco en la api es: ", id);
    const apiUrl = `https://trefle.io/api/v1/species/${id}?token=${this.token}`;

    console.log(apiUrl);
    return this.http.get(apiUrl); 
  }
}
