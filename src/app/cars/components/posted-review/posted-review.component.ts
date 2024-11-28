import { Component, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Review } from '../../models/products/review';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posted-review',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './posted-review.component.html',
  styleUrl: './posted-review.component.scss'
})
export class PostedReviewComponent {
  
  @Input() 
  review!: Review;

}
