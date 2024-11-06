import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantCardComponent } from '../plant-card/plant-card.component';
import { PlantListComponent } from '../plant-list/plant-list.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { PlantInformationComponent } from '../plant-information/plant-information.component';



@NgModule({
  declarations: [
    PlantCardComponent,
    PlantListComponent,
    PaginationComponent,
    PlantInformationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlantListComponent // Exporta si necesitas usarlo en otros módulos
  ]
})
export class PlantsMModule { }
