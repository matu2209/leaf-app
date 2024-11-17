import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantsService } from '../../../services/plants-service/plants.service';
import { AuthenticationService } from '../../../services/authentication-service/authentication.service';
import { Client } from '../../../../../servidorConJWT/cliente';

@Component({
  selector: 'app-plant-information-page',
  templateUrl: './plant-information-page.component.html',
  styleUrl: './plant-information-page.component.scss'
})
export class PlantInformationPageComponent implements OnInit{
  noteForm!: FormGroup;

  constructor(private fb: FormBuilder, private PlantsService: PlantsService, private route: ActivatedRoute, private AuthenticationService: AuthenticationService){
  }

  id: number = 0;
  plantData: any;
  distributionUser: string = "";
  user?: Client;

  ngOnInit(): void {

    this.noteForm = this.fb.group({
      note: new FormControl("")
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);

    this.PlantsService.getById(this.id).subscribe(
      (data) => {
        this.plantData = data.data;
        console.log('data recivida:', data);
        
          this.AuthenticationService.loggedInUser$.subscribe(user => {
            this.user = user;
            if(this.user){
              if(this.isFavorite(this.plantData.id)){
                this.noteForm.setValue({
                  note: this.user?.favorites.find(fav => fav.id === this.plantData.id)?.note
                });}
                this.distributionUser = this.isFavorable();
            }
          });
      },
      (error) => {
        console.error('Error al obtener el token:', error);
      }
    );

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

  isFavorable(): string{
    
    if (Array.isArray(this.plantData.distribution.native) && this.plantData.distribution.native.includes(this.user?.country)) {
      return `This plant is native to your region (${this.user?.country}) and may be highly favorable.`;
    }
    
    if (Array.isArray(this.plantData.distribution.introduced) && this.plantData.distribution.introduced.includes(this.user?.country)) {
      return `This plant has been introduced to your region (${this.user?.country}) and may adapt well.`;
    }
    
    return `This plant is not suitable for your region (${this.user?.country}).`;
  }

  deleteFromFavorites(id: number){
    if (this.user) {
      // Verificar si el ID ya existe en el arreglo de favoritos
      const exists = this.isFavorite(id);
      //const exists = this.user.favorites.some(favorite => favorite.id === id);
  
      // Si el ID no existe, agregarlo al arreglo de favoritos
      if (exists) {
        const index = this.user.favorites.findIndex(favorite => favorite.id === id);
        this.user.favorites.splice(index, 1);
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

  updateNote(id: number){
    if(this.user){
      const note: string = this.noteForm.value.note;
      const favorite = this.user.favorites.find(fav => fav.id === this.plantData.id);
      if (favorite) {
        favorite.note = note; // Obtén el valor del FormControl
        this.AuthenticationService.updateUser(this.user)
          .subscribe(
            response => {
              console.log("Note updated successfully:", favorite.note);
            },
            error => {
              console.error("Error updating note", error);
            }
          );
      }
    }
  }
}
