import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCommentComponentComponent } from './forum-comment-component.component';

describe('ForumCommentComponentComponent', () => {
  let component: ForumCommentComponentComponent;
  let fixture: ComponentFixture<ForumCommentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumCommentComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumCommentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
