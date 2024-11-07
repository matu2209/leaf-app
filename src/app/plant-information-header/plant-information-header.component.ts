import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-information-header',
  templateUrl: './plant-information-header.component.html',
  styleUrl: './plant-information-header.component.scss'
})
export class PlantInformationHeaderComponent {
  @Input() plantData: any;  // Recibir la planta desde el componente padre

}
