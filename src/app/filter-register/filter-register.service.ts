import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterRegisterService {

  constructor() { }

  plants: any[] = [];


  private filtros: any = {}; // Aquí guardaremos los filtros seleccionados

  setFiltros(filtros: any): void {
    this.filtros = filtros;
  }

  getFiltros(): any {
    return this.filtros;
  }


}
