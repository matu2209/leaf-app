import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent {
  @Input() plant: any;  // Recibir la planta desde el componente padre

  onCardClick(plant: any): void {
    console.log('Tarjeta clickeada:', plant);
    // Aquí puedes agregar la funcionalidad que desees
  }
  
}
