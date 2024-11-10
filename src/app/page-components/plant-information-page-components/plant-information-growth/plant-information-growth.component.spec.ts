import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInformationGrowthComponent } from './plant-information-growth.component';

describe('PlantInformationGrowthComponent', () => {
  let component: PlantInformationGrowthComponent;
  let fixture: ComponentFixture<PlantInformationGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantInformationGrowthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInformationGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
