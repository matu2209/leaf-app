import { Component, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlantsService } from '../../services/plants-service/plants.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent {
  @Output() filterSubmitted = new EventEmitter<void>(); 


  filterForm!: FormGroup;
  nameForm!: FormGroup;

  queryParameters: string[] = [];

  constructor(private PlantsService: PlantsService){ }

  ngOnInit():any{

    this.nameForm = new FormGroup({
      plant_name: new FormControl('')
    });

    this.filterForm = new FormGroup({
      growth_form: new FormControl(''), 
      growth_habit: new FormControl(''), 
      growth_rate: new FormControl(''),
      edible: new FormControl(false),
      part_roots: new FormControl(false),
      part_leaves: new FormControl(false),
      foliage_texture: new FormControl(''),
      has_fruit: new FormControl(false),
      is_vegetable: new FormControl(false),
      has_flowers: new FormControl(false)
    });

  }

  onSubmitFilter(): void {
    const filters = this.filterForm.value;
    this.queryParameters = [];
  
    if (filters.edible) {
      this.queryParameters.push(`filter[edible]=true`);
    }
    if (filters.part_roots) {
      this.queryParameters.push(`filter[edible_part]=roots`);
    }
    if (filters.part_leaves) {
      this.queryParameters.push(`filter[edible_part]=leaves`);
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

  onSubmitName(){
    const filter = this.nameForm.value;
    this.fetchPlants(`&filter[common_name]=${filter.plant_name}`);
  }
  
  getPageNumber(link: String) {
    return link ? link.substring(link.lastIndexOf("=") + 1) : "";
  }

  fetchPlants(queryString: string) {

    this.filterForm.reset();
    this.nameForm.reset({
      plant_name: ''
    });

    this.PlantsService.getByFilters(queryString, "1").subscribe(
      response => {
        console.log(response.data);
        this.PlantsService.plants = response.data;

        this.PlantsService.actualPage = this.getPageNumber(response.links.self);
        this.PlantsService.firstPage = this.getPageNumber(response.links.first);
        this.PlantsService.previousPage = this.getPageNumber(response.links.prev);
        this.PlantsService.nextPage = this.getPageNumber(response.links.next);
        this.PlantsService.endPage = this.getPageNumber(response.links.last);

        this.filterSubmitted.emit(); 
      },
      error => {
        console.error('Error al obtener las plantas', error);
      }
    );
  }

}
