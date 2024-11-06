import { Component, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlantsService } from '../plants/plants.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent {
  @Output() filterSubmitted = new EventEmitter<void>(); 


  filterForm!: FormGroup;
  queryParameters: string[] = [];

  constructor(private PlantsService: PlantsService){ }

  ngOnInit():any{

    this.filterForm = new FormGroup({
      days_to_harvest: new FormControl(''),
      ph_maximum: new FormControl(''),
      ph_minimum: new FormControl(''),
      light: new FormControl(''),
      atmospheric_humidity: new FormControl(''),
      growth_form: new FormControl(''), // Fixed here
      growth_habit: new FormControl(''), // Fixed here
      growth_rate: new FormControl(''), // Fixed here
      part_roots: new FormControl(false),
      part_leaves: new FormControl(false),
      part_steams: new FormControl(false), // Added missing form control
      part_flowers: new FormControl(false),
      part_seeds: new FormControl(false),
      part_fruits: new FormControl(false),
      toxicity: new FormControl('none'),
      foliage_texture: new FormControl(''),
      leaf_retention: new FormControl(false),
      has_fruit: new FormControl(false),
      is_vegetable: new FormControl(false),
      has_flowers: new FormControl(false)
    });

  }

  onSubmit(): void {
    const filters = this.filterForm.value;
    this.queryParameters = [];
  
    if (filters.days_to_harvest) {
      this.queryParameters.push(`filter[days_to_harvest]=${filters.days_to_harvest}`);
    }
    
    if (filters.ph_maximum) {
      this.queryParameters.push(`filter[ph_maximum]=${filters.ph_maximum}`);
    }
    
    if (filters.ph_minimum) {
      this.queryParameters.push(`filter[ph_minimum]=${filters.ph_minimum}`);
    }
    
    if (filters.light) {
      this.queryParameters.push(`filter[light]=${filters.light}`);
    }
    
    if (filters.atmospheric_humidity) {
      this.queryParameters.push(`filter[atmospheric_humidity]=${filters.atmospheric_humidity}`);
    }
  
    if (filters.part_roots) {
      this.queryParameters.push(`filter[edible_part]=roots`);
    }
    if (filters.part_leaves) {
      this.queryParameters.push(`filter[edible_part]=leaves`);
    }
    if (filters.part_steams) {
      this.queryParameters.push(`filter[edible_part]=steam`);
    }
    if (filters.part_flowers) {
      this.queryParameters.push(`filter[edible_part]=flower`);
    }
    if (filters.part_seeds) {
      this.queryParameters.push(`filter[edible_part]=seed`);
    }
    if (filters.part_fruits) {
      this.queryParameters.push(`filter[edible_part]=fruit`);
    }

    if (filters.growth_form) {
      this.queryParameters.push(`filter[growth_form]=${filters.growth_form}`);
    }
    if (filters.growth_habit) {
      this.queryParameters.push(`filter[growth_habit]=${filters.growth_habit}`);
    }
    if (filters.growth_rate) {
      this.queryParameters.push(`filter[growth_rate]=${filters.growth_rate}`);
    }
  
    if (filters.foliage_texture) {
      this.queryParameters.push(`filter[foliage_texture]=${filters.foliage_texture}`);
    }
    
    if (filters.leaf_retention) {
      this.queryParameters.push(`filter[leaf_retention]=true`);
    }

    if (filters.has_fruit) {
      this.queryParameters.push(`filter[fruit_conspicuous]=true`);
    }
    if (filters.is_vegetable) {
      this.queryParameters.push(`filter[vegetable]=true`);
    }
    if (filters.has_flowers) {
      this.queryParameters.push(`filter[flower_conspicuous]=true`);
    }
    
    const queryString = this.queryParameters.length > 0 ? '&' + this.queryParameters.join('&') : '';
  
    this.fetchPlants(queryString);

  }
  

  fetchPlants(queryString: string) {

    this.PlantsService.getByFilters(queryString).subscribe(
      response => {
        console.log(response.data);
        this.PlantsService.plants = response.data;
        this.filterSubmitted.emit(); 
      },
      error => {
        console.error('Error al obtener las plantas', error);
      }
    );
  }

}
