import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-information-distributions',
  templateUrl: './plant-information-distributions.component.html',
  styleUrl: './plant-information-distributions.component.scss'
})
export class PlantInformationDistributionsComponent {

  @Input() plantData: any;  // Recibir la planta desde el componente padre

}
