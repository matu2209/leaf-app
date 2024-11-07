import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInformationDistributionsComponent } from './plant-information-distributions.component';

describe('PlantInformationDistributionsComponent', () => {
  let component: PlantInformationDistributionsComponent;
  let fixture: ComponentFixture<PlantInformationDistributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantInformationDistributionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInformationDistributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
