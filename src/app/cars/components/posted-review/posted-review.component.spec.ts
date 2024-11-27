import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedReviewComponent } from './posted-review.component';

describe('PostedReviewComponent', () => {
  let component: PostedReviewComponent;
  let fixture: ComponentFixture<PostedReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostedReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostedReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
