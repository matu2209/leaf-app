import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-information-gallerie',
  templateUrl: './plant-information-gallerie.component.html',
  styleUrl: './plant-information-gallerie.component.scss'
})
export class PlantInformationGallerieComponent {

  @Input() plantData: any;  // Recibir la planta desde el componente padre

}
