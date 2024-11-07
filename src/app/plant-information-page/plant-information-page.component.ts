import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantsService } from '../plants/plants.service';

@Component({
  selector: 'app-plant-information-page',
  templateUrl: './plant-information-page.component.html',
  styleUrl: './plant-information-page.component.scss'
})
export class PlantInformationPageComponent implements OnInit{

  constructor(private PlantsService: PlantsService, private route: ActivatedRoute){}

  id: String = "0";
  plantData: any;

  ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);

    this.PlantsService.getById(this.id).subscribe(
      (data) => {
        this.plantData = data.data;
        console.log('data recivida:', data);
      },
      (error) => {
        console.error('Error al obtener el token:', error);
      }
    );
  }


  

}
