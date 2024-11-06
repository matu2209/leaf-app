import { Component, ViewChild } from '@angular/core';
import { PlantsService } from '../plants/plants.service';
import { PlantListComponent } from '../plant-list/plant-list.component';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

  @ViewChild(PlantListComponent) plantListComponent!: PlantListComponent;

  onFilterSubmitted() {
    this.plantListComponent.loadFilteredPlants(); // Llama al método en el componente de lista de plantas
  }
}
