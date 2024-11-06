import { Component, HostListener, OnInit } from '@angular/core';
import { PlantsService } from '../plants/plants.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  ngOnInit(): void {
  }

}
