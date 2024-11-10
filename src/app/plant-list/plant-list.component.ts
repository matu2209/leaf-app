import { Component, Input } from '@angular/core';
import { PlantsService } from '../plants/plants.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Client } from '../../../servidorConJWT/cliente';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent {
  @Input() initplants: boolean = false; 
  @Input() favPlants: boolean = false; 

  plants: any[] = [];

  actualPage: String = "1";
  firstPage: String = "";
  previousPage: String = "";
  nextPage: String = "";
  endPage: String = "";

  user?: Client;

  constructor(private PlantsService: PlantsService, private AuthenticationService: AuthenticationService) {}


  ngOnInit(): void {
    
    this.AuthenticationService.loggedInUser$.subscribe(user => {
      this.user = user;
    });

    if(!this.PlantsService.token){
      this.PlantsService.getToken().subscribe(
        (data) => {
          console.log('Token recibido:', data.token);
          this.PlantsService.token = data.token;
          this.loadPlants(); 
        },
        (error) => {
          console.error('Error al obtener el token:', error);
        }
      );
    }else{
      if(this.favPlants){
        this.loadFavoritesPlants();
      }
      else if(this.initplants || this.PlantsService.plants.length == 0){
        this.plants = this.PlantsService.initplants;
      }
      else{
        this.loadFilteredPlants();
      }
    }
  }

  loadPlants(): void {
    // Llama a tu servicio para obtener las plantas
    this.PlantsService.getPlants().subscribe(
      (data) => {
        this.plants = data.data; // Guarda los registros de plantas
        this.plants = this.plants.slice(0,9);
        this.PlantsService.initplants = this.plants;
        console.log('Plantas recibidas:', this.plants);
      },
      (error) => {
        console.error('Error al obtener las plantas:', error);
      }
    );
  }

  loadFilteredPlants(){
    this.plants = this.PlantsService.plants;
    this.actualPage = this.PlantsService.actualPage;
    this.firstPage = this.PlantsService.firstPage;
    this.previousPage = this.PlantsService.previousPage; 
    this.nextPage = this.PlantsService.nextPage;
    this.endPage = this.PlantsService.endPage;
  }

  loadFavoritesPlants(){
    if (!this.user || !this.user.favorites.length) {
      console.log("No se encontraron plantas favoritas.");
      return;
    }
  
    // Crear un array de Observables para obtener cada planta por su ID
    const favoriteRequests = this.user.favorites.map((favorite) => this.PlantsService.getById(favorite.id));
  
    // forkJoin es esperar a que todas las solicitudes que hay en el arrego favoriteequest terminen
    forkJoin(favoriteRequests).subscribe(
      (results) => {
        // this.plants = results;
        this.plants = results.map((result) => result.data); //recupero solo el atributo data que me interesa
        console.log('Plantas favoritas cargadas:', this.plants);
      },
      (error) => {
        console.error('Error al cargar las plantas favoritas:', error);
      }
    );
  }

  getPageNumber(link: String) {
    return link ? link.substring(link.lastIndexOf("=") + 1) : "";
  }

  changePage(page: String){
    this.actualPage = page;
    console.log("pagina actual : " + this.actualPage);
    this.PlantsService.getByFilters(this.PlantsService.lastFilter, page).subscribe(
      response => {
        this.PlantsService.plants = response.data;

        this.PlantsService.actualPage = this.actualPage;
        this.PlantsService.previousPage = this.getPageNumber(response.links.prev);
        this.PlantsService.nextPage = this.getPageNumber(response.links.next);

        console.log(this.PlantsService.previousPage);
        console.log(this.PlantsService.nextPage);

        this.previousPage = this.PlantsService.previousPage;
        this.nextPage = this.PlantsService.nextPage;

        this.plants = this.PlantsService.plants; 
      },
      error => {
        console.error('Error al obtener las plantas', error);
      }
    );
  }
  
}
