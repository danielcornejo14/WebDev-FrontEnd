import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MightLikeComponent } from './might-like.component';

describe('MightLikeComponent', () => {
  let component: MightLikeComponent;
  let fixture: ComponentFixture<MightLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MightLikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MightLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
