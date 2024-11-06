import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromRegisterComponent } from './from-register.component';

describe('FromRegisterComponent', () => {
  let component: FromRegisterComponent;
  let fixture: ComponentFixture<FromRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FromRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
