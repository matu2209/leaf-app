import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInformationPageComponent } from './plant-information-page.component';

describe('PlantInformationPageComponent', () => {
  let component: PlantInformationPageComponent;
  let fixture: ComponentFixture<PlantInformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantInformationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
