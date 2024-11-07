import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-information-specifications',
  templateUrl: './plant-information-specifications.component.html',
  styleUrl: './plant-information-specifications.component.scss'
})
export class PlantInformationSpecificationsComponent {

  @Input() plantData: any;  // Recibir la planta desde el componente padre

}
