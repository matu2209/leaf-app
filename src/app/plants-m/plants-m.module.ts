import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';


import { PlantCardComponent } from '../plant-display-components/plant-card/plant-card.component';
import { PlantListComponent } from '../plant-display-components/plant-list/plant-list.component';
import { PaginationComponent } from '../plant-display-components/pagination/pagination.component';
import { PlantInformationHeaderComponent } from '../page-components/plant-information-page-components/plant-information-header/plant-information-header.component';
import { PlantInformationDistributionsComponent } from '../page-components/plant-information-page-components/plant-information-distributions/plant-information-distributions.component';
import { PlantInformationSpecificationsComponent } from '../page-components/plant-information-page-components/plant-information-specifications/plant-information-specifications.component';
import { PlantInformationGrowthComponent } from '../page-components/plant-information-page-components/plant-information-growth/plant-information-growth.component';
import { PlantInformationGallerieComponent } from '../page-components/plant-information-page-components/plant-information-gallerie/plant-information-gallerie.component';
import { SpinnerComponent } from '../spinner/spinner.component';



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
    SpinnerComponent
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
    SpinnerComponent
  ]
})
export class PlantsMModule { }
