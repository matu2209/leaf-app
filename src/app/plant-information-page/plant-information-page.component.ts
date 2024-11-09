import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantsService } from '../plants/plants.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Client } from '../../../servidorConJWT/cliente';

@Component({
  selector: 'app-plant-information-page',
  templateUrl: './plant-information-page.component.html',
  styleUrl: './plant-information-page.component.scss'
})
export class PlantInformationPageComponent implements OnInit{

  constructor(private PlantsService: PlantsService, private route: ActivatedRoute, private AuthenticationService: AuthenticationService){}

  id: String = "0";
  plantData: any;

  user?: Client;

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

    this.AuthenticationService.loggedInUser$.subscribe(user => {
      this.user = user;
    });
  }


  addToFavorite(id: number){
    if (this.user) {
      // Verificar si el ID ya existe en el arreglo de favoritos
      const exists = this.isFavorite(id);
      //const exists = this.user.favorites.some(favorite => favorite.id === id);
  
      // Si el ID no existe, agregarlo al arreglo de favoritos
      if (!exists) {
        this.user.favorites.push({ id, note: "" });
        this.AuthenticationService.updateUser(this.user)
        .subscribe(
          response => {
            console.log("Planta agregada a favoritos:", { id, note: "" });
          },
          error => {
            console.error("Error al actualizar el usuario:", error);
          }
        );
      } else {
        console.log("La planta ya está en favoritos.");
      }
    }
  }

  isFavorite(id: number): Boolean{
    if(this.user){
      const exists = this.user.favorites.some(favorite => favorite.id === id);
      if(exists){
        return true;
      }
    }
    return false;
  }

  deleteFromFavorites(id: number){
    console.log("eliminar:", id);
  }

}
