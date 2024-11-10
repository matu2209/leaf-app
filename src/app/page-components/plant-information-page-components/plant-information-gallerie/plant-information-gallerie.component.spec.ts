import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInformationGallerieComponent } from './plant-information-gallerie.component';

describe('PlantInformationGallerieComponent', () => {
  let component: PlantInformationGallerieComponent;
  let fixture: ComponentFixture<PlantInformationGallerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantInformationGallerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInformationGallerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
