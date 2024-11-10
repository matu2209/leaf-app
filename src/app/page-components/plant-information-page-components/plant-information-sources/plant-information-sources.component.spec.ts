import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInformationSourcesComponent } from './plant-information-sources.component';

describe('PlantInformationSourcesComponent', () => {
  let component: PlantInformationSourcesComponent;
  let fixture: ComponentFixture<PlantInformationSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantInformationSourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInformationSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
