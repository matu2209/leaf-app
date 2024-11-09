import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';


import { PlantCardComponent } from '../plant-card/plant-card.component';
import { PlantListComponent } from '../plant-list/plant-list.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { PlantInformationHeaderComponent } from '../plant-information-header/plant-information-header.component';
import { PlantInformationDistributionsComponent } from '../plant-information-distributions/plant-information-distributions.component';
import { PlantInformationSpecificationsComponent } from '../plant-information-specifications/plant-information-specifications.component';
import { PlantInformationGrowthComponent } from '../plant-information-growth/plant-information-growth.component';
import { PlantInformationGallerieComponent } from '../plant-information-gallerie/plant-information-gallerie.component';



@NgModule({
  declarations: [
    PlantCardComponent,
    PlantListComponent,
    PaginationComponent,
    PlantInformationHeaderComponent,
    PlantInformationDistributionsComponent,
    PlantInformationSpecificationsComponent,
    PlantInformationGrowthComponent,
    PlantInformationGallerieComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    PlantListComponent,
    PlantInformationHeaderComponent,
    PlantInformationDistributionsComponent,
    PlantInformationSpecificationsComponent,
    PlantInformationGrowthComponent,
    PlantInformationGallerieComponent,
  ]
})
export class PlantsMModule { }
