import { Component } from '@angular/core';
import { PlantsService } from '../plants/plants.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent {
  plants: any[] = [];

  constructor(private PlantsService: PlantsService) {}

  ngOnInit(): void {
    if(!this.PlantsService.token){
      this.PlantsService.getToken().subscribe(
        (data) => {
          console.log('Token recibido:', data.token);
          this.PlantsService.token = data.token;
          this.loadPlants(); 
        },
        (error) => {
          console.error('Error al obtener el token:', error);
        }
      );
    }else{
      this.plants = this.PlantsService.initplants
    }
  }

  loadPlants(): void {
    // Llama a tu servicio para obtener las plantas
    this.PlantsService.getPlants().subscribe(
      (data) => {
        this.plants = data.data; // Guarda los registros de plantas
        this.plants = this.plants.slice(0,9);
        this.PlantsService.initplants = this.plants;
        console.log('Plantas recibidas:', this.plants);
      },
      (error) => {
        console.error('Error al obtener las plantas:', error);
      }
    );
  }

  loadFilteredPlants(){
    this.plants = this.PlantsService.plants;
  }
  
}
