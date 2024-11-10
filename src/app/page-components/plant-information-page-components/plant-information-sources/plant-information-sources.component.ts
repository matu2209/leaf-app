import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-information-sources',
  templateUrl: './plant-information-sources.component.html',
  styleUrl: './plant-information-sources.component.scss'
})
export class PlantInformationSourcesComponent {

  @Input() plantData: any;  // Recibir la planta desde el componente padre

}
