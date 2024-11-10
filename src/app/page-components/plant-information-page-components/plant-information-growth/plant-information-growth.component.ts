import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-information-growth',
  templateUrl: './plant-information-growth.component.html',
  styleUrl: './plant-information-growth.component.scss'
})
export class PlantInformationGrowthComponent {

  @Input() plantData: any;  // Recibir la planta desde el componente padre

}
