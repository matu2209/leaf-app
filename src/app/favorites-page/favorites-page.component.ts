import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})
export class FavoritesPageComponent {
    favPlants: any[] = [];

    ngOnInit(){

    }
}
