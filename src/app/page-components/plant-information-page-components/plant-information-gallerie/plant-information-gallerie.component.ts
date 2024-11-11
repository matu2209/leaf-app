import { Component, Input } from '@angular/core';

declare var bootstrap: any; 
@Component({
  selector: 'app-plant-information-gallerie',
  templateUrl: './plant-information-gallerie.component.html',
  styleUrls: ['./plant-information-gallerie.component.scss']
})

export class PlantInformationGallerieComponent {

  @Input() plantData: any; 
  selectedImage: string = ''; 


  openImageModal(imageUrl: string) {
    this.selectedImage = imageUrl; 
    const modal = new bootstrap.Modal(document.getElementById('imageModal')); 
    modal.show();
  }
}
