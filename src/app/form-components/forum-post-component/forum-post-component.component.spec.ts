import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostComponentComponent } from './forum-post-component.component';

describe('ForumPostComponentComponent', () => {
  let component: ForumPostComponentComponent;
  let fixture: ComponentFixture<ForumPostComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumPostComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumPostComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
