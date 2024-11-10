import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInformationSpecificationsComponent } from './plant-information-specifications.component';

describe('PlantInformationSpecificationsComponent', () => {
  let component: PlantInformationSpecificationsComponent;
  let fixture: ComponentFixture<PlantInformationSpecificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantInformationSpecificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInformationSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
