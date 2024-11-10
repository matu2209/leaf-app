import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInformationHeaderComponent } from './plant-information-header.component';

describe('PlantInformationHeaderComponent', () => {
  let component: PlantInformationHeaderComponent;
  let fixture: ComponentFixture<PlantInformationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantInformationHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInformationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
